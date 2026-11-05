module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist/kenl.ee',
      settings: {
        chromeFlags: '--no-sandbox --disable-gpu',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        // This diagnostic fails on any HTML-to-script chain, regardless of duration.
        // Keep it visible without making ordinary application scripts fail CI.
        'network-dependency-tree-insight': 'warn',
        // Angular's shared runtime includes code not exercised during initial load.
        // Gate total script transfer and measured performance instead of zero coverage waste.
        'unused-javascript': ['warn', { maxLength: 0 }],
        'resource-summary:script:size': ['error', { maxNumericValue: 120 * 1024 }],
        'categories:performance': ['error', { minScore: 0.9 }],
      },
    },
  },
};
