const next = require('eslint-config-next');

module.exports = [
  ...next,
  {
    rules: {
      // Keep minimal rules to avoid noise in scaffolding
      "@next/next/no-html-link-for-pages": "off"
    }
  }
];
