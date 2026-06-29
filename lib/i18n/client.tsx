'use client';

import { createContext, useContext, useCallback, type ReactNode } from 'react';

type Messages = Record<string, unknown>;

const I18nContext = createContext<Messages | null>(null);

export function I18nProvider({ messages, children }: { messages: Messages; children: ReactNode }) {
  return <I18nContext.Provider value={messages}>{children}</I18nContext.Provider>;
}

function getValue(obj: Messages, path: string[]): string {
  let current: unknown = obj;
  for (const key of path) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Messages)[key];
    } else {
      return path.join('.');
    }
  }
  return typeof current === 'string' ? current : path.join('.');
}

export function useTranslations(namespace?: string) {
  const messages = useContext(I18nContext);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      if (!messages) return key;
      const path = namespace ? [namespace, key] : [key];
      let value = getValue(messages, path);
      if (params) {
        for (const [pk, pv] of Object.entries(params)) {
          value = value.replace(`{${pk}}`, String(pv));
        }
      }
      return value;
    },
    [messages, namespace],
  );

  return t;
}
