export const motion = {
  duration: {
    fast: 150,
    base: 240,
    slow: 480,
    reveal: 800,
  },
  ease: {
    editorial: 'cubic-bezier(0.2, 0.6, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
  },
  stagger: (index: number) => index * 80,
} as const;
