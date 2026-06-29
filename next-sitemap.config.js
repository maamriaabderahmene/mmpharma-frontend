/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.MMP_APP_URL || 'https://www.mm-pharma.ma',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/api/' },
      { userAgent: '*', disallow: '/admin/' },
    ],
    additionalSitemaps: [],
  },
  exclude: [
    '/api/*',
    '/admin/*',
    '/_next/*',
    '/404',
    '/500',
  ],
  alternateRefs: [
    { href: 'https://www.mm-pharma.ma/fr-MA', hreflang: 'fr-MA' },
    { href: 'https://www.mm-pharma.ma/ar-MA', hreflang: 'ar-MA' },
    { href: 'https://www.mm-pharma.ma/en-US', hreflang: 'en-US' },
    { href: 'https://www.mm-pharma.ma', hreflang: 'x-default' },
  ],
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: path === '/' ? 'daily' : 'weekly',
      priority: path === '/' ? 1.0 : 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};
