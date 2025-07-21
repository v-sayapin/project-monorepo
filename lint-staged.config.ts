import type { Configuration } from 'lint-staged';

const config: Configuration = {
	'*.{js,jsx,ts,tsx,d.ts}': ['yarn eslint --fix'],
	'*.{ts,tsx,d.ts}': () => 'yarn ts-check',
	'*.css': ['yarn stylelint --fix'],
	'*.{md,json,yaml,yml}': ['yarn prettier --write'],
};

export default config;
