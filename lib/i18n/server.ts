import 'server-only';
import type { Locale } from '@/lib/shared/constants/Locale';

function getValue(obj: Record<string, unknown>, path: string[]): string {
  let current: unknown = obj;
  for (const key of path) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path.join('.');
    }
  }
  return typeof current === 'string' ? current : path.join('.');
}

export async function getTranslations(locale: string, namespace?: string) {
  let messages: Record<string, unknown>;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch {
    messages = {};
  }

  return (key: string, params?: Record<string, string | number>) => {
    const path = namespace ? [namespace, key] : [key];
    let value = getValue(messages, path);
    if (params) {
      for (const [pk, pv] of Object.entries(params)) {
        value = value.replace(`{${pk}}`, String(pv));
      }
    }
    return value;
  };
}
