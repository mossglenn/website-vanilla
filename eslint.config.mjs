import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import astroParser from 'astro-eslint-parser';
import astro from 'eslint-plugin-astro';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import promise from 'eslint-plugin-promise';
import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';

export default [
  // 🔍 Astro with Astro Parser
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        sourceType: 'module',
        ecmaVersion: 'latest',
        extraFileExtensions: ['.astro'],
        project: './tsconfig.json'
      }
    },
    plugins: {
      astro,
      import: importPlugin,
      prettier
    },
    rules: {
      'astro/no-set-html-directly': 'warn',
      'astro/no-duplicate-slot-names': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'prettier/prettier': 'error' // 🟢 Enforce Prettier rules
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['@', './src'],
            ['@components', './src/components'],
            ['@layouts', './src/layouts'],
            ['@pages', './src/pages'],
            ['@public', './public'],
            ['@styles', './src/styles'],
            ['@assets', './src/assets'],
            ['@project-images', './src/assets/images/project-images']
          ],
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.astro']
        }
      }
    }
  },

  // 🔍 TypeScript Configuration
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json'
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'prettier/prettier': 'error'
    }
  },

  // 🔍 Global Ignores
  {
    ignores: [
      'node_modules/**/*',
      'dist/**/*',
      'public/**/*',
      '.astro/**/*',
      '.netlify/**/*',
      '.reference-files/**/*',
      '.vscode/**/*',
      '_scripts/**/*',
      '.husky/**/*'
    ]
  }
];
