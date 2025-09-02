// eslint.config.mjs
import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import prettierConfig from 'eslint-config-prettier';

export default [
  { ignores: ['**/node_modules', '**/dist', '**/out'] },

  // Base rules
  js.configs.recommended,

  // React rules (if flat configs exist)
  ...(reactPlugin.configs.flat
    ? [reactPlugin.configs.flat.recommended, reactPlugin.configs.flat['jsx-runtime']]
    : [reactPlugin.configs.recommended]),

  {
    settings: {
      react: {
        version: 'detect'
      }
    }
  },

  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
      'unused-imports': unusedImportsPlugin
    },
    rules: {
      ...(reactHooksPlugin.configs.recommended?.rules ?? {}),
      ...(reactRefreshPlugin.configs.vite?.rules ?? {}),

      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ],

      ...(prettierConfig.rules ?? {})
    }
  }
];
