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
			name: 'secondMf',
			filename: 'remoteEntry.js',
			remotes: {
				firstMf: `http://localhost:${portMap.firstMf}/assets/remoteEntry.js`,
			},
			exposes: {
				'./Buttons': './src/components/Buttons',
			},
			shared: ['solid-js'],
		}),
	],
	build: {
		cssCodeSplit: false,
	},
	server: { port: portMap.secondMf },
	preview: { port: portMap.secondMf },
});
