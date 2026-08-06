/**
 * ESLint configuration for Pac-Man 3 project.
 * Uses @typescript-eslint parser and integrates with Prettier.
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // Add project-specific rule overrides here
    '@typescript-eslint/no-explicit-any': 'off',
    'react/react-in-jsx-scope': 'off', // Not needed with React 17+ JSX transform
  },
};
