import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import checkFile from 'eslint-plugin-check-file';
import unusedImports from 'eslint-plugin-unused-imports';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import functional from 'eslint-plugin-functional';
import unicorn from 'eslint-plugin-unicorn';
import jest from 'eslint-plugin-jest';
import jestFormatting from 'eslint-plugin-jest-formatting';
import testingLibrary from 'eslint-plugin-testing-library';
import jestDom from 'eslint-plugin-jest-dom';
import nextPlugin from '@next/eslint-plugin-next';

const commonImportRules = [
  {
    group: ['../'],
    message: 'Relative imports other than siblings are not allowed.',
  },
];

export default tseslint.config(
  // Global ignores
  {
    ignores: [
      'node_modules/**',
      'generated/**',
      '__mocks__/**',
      'deployment/**',
      'scripts/**',
      '.next/**',
      'out/**',
      'build/**',
      'eslint.config.mjs',
      'next-env.d.ts',
    ],
  },

  // Base configuration for all files
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      'check-file': checkFile,
      '@next/next': nextPlugin,
    },
    rules: {
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*': 'KEBAB_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      'check-file/folder-naming-convention': [
        'error',
        {
          '**/!(\\[*)': 'NEXT_JS_APP_ROUTER_CASE',
        },
      ],
      'operator-linebreak': 'off',
    },
  },

  // TypeScript files configuration
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort,
      react,
      'react-hooks': reactHooks,
      functional,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],

      // General rules
      'no-confusing-arrow': 'off',
      'comma-dangle': 0,
      'function-paren-newline': 'off',
      'operator-linebreak': 'off',
      'no-console': 'error',
      'object-curly-newline': 'off',
      indent: 'off',
      '@typescript-eslint/indent': 'off',
      'implicit-arrow-linebreak': 'off',
      'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
      'no-restricted-syntax': [
        'error',
        'ForInStatement',
        'LabeledStatement',
        'WithStatement',
      ],

      // Import rules
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'unused-imports/no-unused-imports': 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: [...commonImportRules],
        },
      ],

      // React rules
      'react/jsx-curly-newline': 'off',
      'react/jsx-wrap-multilines': [
        'error',
        { arrow: true, return: true, declaration: true },
      ],
      'react/function-component-definition': 'off',
      'react/require-default-props': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-no-bind': [
        'error',
        {
          allowArrowFunctions: true,
          ignoreDOMComponents: false,
          ignoreRefs: false,
          allowFunctions: false,
          allowBind: false,
        },
      ],
      'react/jsx-no-leaked-render': 'error',
      'react/no-array-index-key': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Functional rules (mostly off for flexibility)
      'functional/no-expression-statements': 'off',
      'functional/no-classes': 'off',
      'functional/functional-parameters': 'off',
      'functional/no-throw-statements': 'off',
      'functional/no-return-void': 'off',
      'functional/no-mixed-types': 'off',
      'functional/no-conditional-statements': 'off',
      'functional/prefer-immutable-types': 'off',

      // Naming conventions
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: null,
          filter: {
            regex: '^[a-z0-9]+(-[a-z0-9]+)*$',
            match: true,
          },
          leadingUnderscore: 'forbid',
          trailingUnderscore: 'forbid',
        },
        {
          selector: 'variableLike',
          format: ['camelCase'],
        },
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        },
        {
          selector: 'variable',
          types: ['boolean'],
          format: ['PascalCase'],
          prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
        },
        {
          selector: ['function'],
          format: ['camelCase'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'enumMember',
          format: ['PascalCase'],
        },
        {
          selector: 'enum',
          format: ['PascalCase'],
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
        },
        {
          selector: 'variable',
          format: ['camelCase'],
          filter: {
            regex: '^use[A-Z].*$',
            match: true,
          },
        },
      ],

      'no-underscore-dangle': ['error', { allow: ['__typename'] }],
    },
  },

  // Unicorn plugin for non-test TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: [
      '**/*.spec.ts',
      '**/*.spec.tsx',
      '**/*.test.ts',
      '**/*.test.tsx',
      'tests/**',
      'types/*.d.ts',
      'next-env.d.ts',
    ],
    plugins: {
      unicorn,
    },
    rules: {
      'unicorn/no-thenable': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-null': 'off',
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          replacements: {
            args: false,
            props: false,
          },
        },
      ],
    },
  },

  // Test files configuration
  {
    files: [
      'tests/**/*.ts',
      'tests/**/*.tsx',
      '**/*.spec.ts',
      '**/*.spec.tsx',
      '**/*.test.ts',
      '**/*.test.tsx',
      'tests/jest.setup.ts',
      'jest.config.ts',
    ],
    plugins: {
      jest,
      'jest-formatting': jestFormatting,
      'testing-library': testingLibrary,
      'jest-dom': jestDom,
    },
    rules: {
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'function-paren-newline': 'off',
    },
  },

  // Type definition files
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/naming-convention': 'off',
    },
  },

  // Next.js app router pages (allow default exports)
  {
    files: [
      '**/app/**/*.tsx',
      'src/middleware.ts',
      'tailwind.config.js',
      'i18n.ts',
      'codegen.ts',
      'src/providers/**/*.tsx',
    ],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
    },
  },

  // Next.js API routes (allow uppercase function names: GET, POST, PUT, DELETE, PATCH)
  {
    files: ['**/app/api/**/*.ts'],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
    },
  },

  // Prisma and seed files
  {
    files: ['prisma/**/*.ts', 'prisma.config.ts'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'unicorn/prevent-abbreviations': 'off',
    },
  },

  // Prettier (should be last)
  eslintPluginPrettier,
);
