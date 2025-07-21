import { fileURLToPath, URL } from 'node:url';

import { includeIgnoreFile } from '@eslint/compat';
import jsEslint from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

const prettierIgnorePath = fileURLToPath(new URL('.prettierignore', import.meta.url));

const config = tsEslint.config(
	includeIgnoreFile(prettierIgnorePath, 'Imported .prettierignore patterns'),
	{
		name: 'js',
		extends: [jsEslint.configs.recommended],
		files: ['**/*.js', '**/*.jsx'],
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
		},
	},
	{
		name: 'ts',
		extends: [tsEslint.configs.strict],
		files: ['**/*.ts', '**/*.tsx', '**/*.d.ts'],
		languageOptions: {
			parser: tsEslint.parser,
			parserOptions: { project: '**/{tsconfig,tsconfig.*}.json' },
			globals: { ...globals.browser, ...globals.node },
		},
		rules: {
			'@typescript-eslint/array-type': ['error', { default: 'generic', readonly: 'generic' }],
			'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
			'@typescript-eslint/consistent-type-exports': 'error',
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{ prefer: 'type-imports', fixStyle: 'separate-type-imports' },
			],
			'@typescript-eslint/no-namespace': ['error', { allowDeclarations: true, allowDefinitionFiles: true }],
			'@typescript-eslint/prefer-function-type': 'error',
		},
	},
	tsEslint.configs.stylistic,
	{
		name: 'import',
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
		},
		plugins: {
			'simple-import-sort': simpleImportSortPlugin,
			import: importPlugin,
		},
		rules: {
			'simple-import-sort/imports': [
				'error',
				{
					groups: [
						// Node.js builtins
						['^node:'],
						// External
						['^'],
						// Internal
						['^src/([a-zA-Z/]+)'],
						// Internal: styles
						['src/.+\\.css$'],
						// Internal: assets with extension
						['src/.+\\..+$'],
					],
				},
			],
			'simple-import-sort/exports': 'error',

			'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
			'import/export': 'error',
			'import/no-commonjs': 'error',
			'import/no-cycle': 'error',
			'import/no-relative-packages': 'error',
			'import/no-relative-parent-imports': 'error',
			'import/newline-after-import': 'error',
			'import/no-duplicates': ['off', { 'prefer-inline': false }],
			'import/no-named-default': 'error',
			'import/no-namespace': 'error',

			'no-restricted-imports': ['error', { patterns: ['.*'] }],
		},
	},
	prettierPlugin
);

export default config;
