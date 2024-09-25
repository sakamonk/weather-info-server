const eslintPrettierConfig = require('eslint-config-prettier');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');

module.exports = [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tsPlugin, // Correctly use the plugin object
    },
    rules: {
      ...tsPlugin.configs.recommended.rules, // Apply recommended rules
      ...eslintPrettierConfig.rules,        // Apply Prettier rules
    },
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    rules: {
      ...eslintPrettierConfig.rules,        // Prettier rules for JS files
    },
  },
];
