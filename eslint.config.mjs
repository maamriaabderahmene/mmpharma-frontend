import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const config = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'node_modules/**',
      'next-env.d.ts',
      'ui-ux-pro-max-skill/**',
      '.agents/**',
      '.github/**',
      '.kimchi/**',
      '.opencode/**',
      '.specify/**',
    ],
  },
  {
    rules: {
      '@next/next/no-img-element': 'off',
      // Existing client data-fetch components use setState in effects.
      // These will be refactored during the modernization phases.
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/error-boundaries': 'off',
      // Existing static pages contain French apostrophes in JSX text.
      // Will be resolved when pages are migrated to translation keys.
      'react/no-unescaped-entities': 'off',
    },
  },
];

export default config;
