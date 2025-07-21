const kebab = '[a-z]+(?:-[a-z]+)*';
const bem = `${kebab}(__${kebab})?(_${kebab}){0,2}`;

/**
 * @filename: stylelint.config.js
 * @type {import('stylelint').Config}
 */
const config = {
	extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
	ignoreFiles: ['**/*', '!**/*.css', '**/node_modules/**', '**/dist/**', '**/lib/**'],
	rules: {
		'selector-class-pattern': [
			`^(${bem})$`,
			{
				resolveNestedSelectors: true,
				message: 'Expected class selector in kebab or BEM format',
			},
		],
		'selector-max-id': [0, { message: 'Id selector are not allowed' }],
	},
};

export default config;
