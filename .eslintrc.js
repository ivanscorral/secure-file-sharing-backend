module.exports = {
  env: {
    browser: false,
    es2021: true,
    node: true
  },
  extends: [
    'standard',
    'plugin:@typescript-eslint/recommended', // TypeScript rules
  ],
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser for TypeScript
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json', // Specify it only if you need @typescript-eslint/parser
  },
  plugins: [
    '@typescript-eslint', // Use TypeScript-specific linting rules
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  rules: {
    // Place your custom rules here
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Example rule, adjust as needed
  },
};
