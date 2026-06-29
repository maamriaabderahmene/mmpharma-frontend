'use client';

export function HiddenSEO({ html }: { html: string }) {
  return (
    <section aria-hidden="true" className="visually-hidden" data-seo-block="true">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  );
}
