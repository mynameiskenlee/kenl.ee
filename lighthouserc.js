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
    },
  },
};
