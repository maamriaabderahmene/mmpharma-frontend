import 'server-only';
import { ApiError } from '@/lib/shared/utils/ApiError';
import { UserRole } from '@/lib/shared/constants/UserRole';
import type { SeoEntry } from '@/lib/shared/types/SeoEntry';
import type { SessionPayload } from '@/lib/shared/types/Session';
import * as seoRepo from './seo.repo';
import { create as createAuditLog } from './audit.repo';
import { cacheHeaders } from './cache';

type HiddenKind = 'product' | 'article' | 'category' | 'page';

export async function getForPath(pagePath: string, locale: string): Promise<SeoEntry> {
  return seoRepo.byPath(pagePath, locale);
}

export async function generateHidden(
  kind: HiddenKind,
  payload: Record<string, unknown>,
  locale: string,
): Promise<string> {
  const cacheKey = `seo:hidden:${kind}:${locale}:${JSON.stringify(payload)}`;

  let seo: SeoEntry | null = null;
  try {
    seo = await seoRepo.byPath(`/${kind}/${payload.slug}`, locale);
    if (seo?.hiddenHtml) return seo.hiddenHtml;
  } catch {
    // no cached entry — generate
  }

  const html = await callDeepSeek(kind, payload, locale);

  const upserted = await seoRepo.upsert({
    pagePath: `/${kind}/${payload.slug as string}`,
    locale,
    title: '',
    description: '',
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/${kind}/${payload.slug as string}`,
    keywords: [],
    hiddenHtml: html,
  });

  return html;
}

export async function regenerateHidden(entryId: string, session: SessionPayload): Promise<SeoEntry> {
  if (session.role < UserRole.ADMIN) {
    throw new ApiError(403, 'FORBIDDEN', 'Only admins can regenerate SEO');
  }

  const entry = await seoRepo.byPath(entryId, 'fr-MA').catch(() => {
    throw new ApiError(404, 'NOT_FOUND', `SEO entry ${entryId} not found`);
  });

  const html = await callDeepSeek('page', { slug: entry.pagePath.split('/').pop() }, entry.locale);

  await seoRepo.upsert({
    pagePath: entry.pagePath,
    locale: entry.locale,
    title: entry.title,
    description: entry.description,
    canonical: entry.canonical,
    keywords: entry.keywords,
    hiddenHtml: html,
  });

  await createAuditLog({
    userId: session.userId,
    action: 'regenerate_seo',
    resource: 'seo',
    resourceId: entryId,
    ip: '',
    userAgent: '',
  });

  return { ...entry, hiddenHtml: html };
}

async function callDeepSeek(kind: HiddenKind, payload: Record<string, unknown>, locale: string): Promise<string> {
  const prompt = `Generate SEO hidden HTML (H1 headline) for ${kind} "${payload.slug as string}" in locale ${locale}. Return only a single <h1> tag.`;

  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY ?? ''}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 100,
    }),
  });

  if (!response.ok) {
    throw new ApiError(502, 'AI_ERROR', 'Failed to generate SEO content');
  }

  const data = (await response.json()) as { choices: Array<{ message: { content: string } }> };
  const html = data.choices[0]?.message?.content ?? '';

  return html;
}
