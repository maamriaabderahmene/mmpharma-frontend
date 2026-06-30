import 'server-only';
import { env } from '@/lib/env';

export const SYSTEM_PROMPTS = {
  product: `You are an SEO copywriter for MM Pharma, a Moroccan pharmaceutical company specializing in hygiene and disinfection products. Generate a single <h1> tag and a short <p> with rich SEO content for a product page. Use French.`,
  blog: `You are an SEO copywriter for MM Pharma. Generate a single <h1> tag and a short <p> with rich SEO content for a blog article page. Use French.`,
  generic: `You are an SEO copywriter for MM Pharma. Generate a single <h1> tag and a short <p> with rich SEO content for the given page. Use French.`,
} as const;

type HiddenKind = keyof typeof SYSTEM_PROMPTS;

export async function generateHiddenSEO(
  kind: HiddenKind,
  payload: Record<string, unknown>,
  locale: string,
): Promise<string> {
  if (!env.DEEPSEEK_API_KEY) {
    return getFallbackHtml(kind, payload);
  }

  const prompt = `Generate SEO hidden HTML for ${kind} "${String(payload.slug ?? payload.title ?? '')}" in locale ${locale}. Return only a single <h1> tag and optionally a <p> tag.`;

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: env.DEEPSEEK_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPTS[kind] },
          { role: 'user', content: prompt },
        ],
        max_tokens: 200,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      return getFallbackHtml(kind, payload);
    }

    const data = (await response.json()) as { choices: Array<{ message: { content: string } }> };
    return data.choices[0]?.message?.content ?? getFallbackHtml(kind, payload);
  } catch {
    return getFallbackHtml(kind, payload);
  }
}

function getFallbackHtml(kind: HiddenKind, payload: Record<string, unknown>): string {
  const name = String(payload.name ?? payload.title ?? payload.slug ?? '');
  switch (kind) {
    case 'product':
      return `<h1>MM Pharma — ${name} : produit d'hygiène et de désinfection professionnel</h1><p>Découvrez ${name}, un produit de qualité pharmaceutique fabriqué au ALGERIA par MM Pharma.</p>`;
    case 'blog':
      return `<h1>MM Pharma — ${name} : article expert en hygiène et désinfection</h1><p>Lisez notre article "${name}" rédigé par nos experts MM Pharma.</p>`;
    default:
      return `<h1>MM Pharma — ${name}</h1><p>MM Pharma, fabricant de produits d'hygiène et de désinfection au ALGERIA.</p>`;
  }
}
