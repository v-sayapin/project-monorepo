import { resolve } from 'node:path';

import federation from '@originjs/vite-plugin-federation';
import { portMap } from '@project-monorepo/env-config';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
	resolve: {
		alias: {
			src: resolve(import.meta.dirname, 'src'),
		},
	},
	plugins: [
		solid(),
		federation({
			name: 'firstMf',
			filename: 'remoteEntry.js',
			exposes: {
				'./Button': './src/components/Button',
			},
			shared: ['solid-js'],
		}),
	],
	build: {
		cssCodeSplit: false,
	},
	server: { port: portMap.firstMf },
	preview: { port: portMap.firstMf },
});
