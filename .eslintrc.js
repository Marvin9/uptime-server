module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'no-async-promise-executor': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    camelcase: 'off',
  },
};
