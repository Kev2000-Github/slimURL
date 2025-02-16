const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const unusedImports = require('eslint-plugin-unused-imports');
const prettierPlugin = require('eslint-plugin-prettier/recommended');

module.exports = [
  {
    files: ['**/*.ts', '**/*.tsx'], // Apply to TypeScript files
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname, // Use __dirname for CommonJS
        sourceType: 'module',
      },
      ecmaVersion: 'latest',
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'unused-imports': unusedImports,
    },
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
    },
  },
  prettierPlugin, // Add Prettier plugin
  {
    ignores: ['.eslintrc.js'], // Ignore files
  },
];
