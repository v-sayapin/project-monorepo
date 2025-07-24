import { resolve } from 'node:path';

import { federation } from '@module-federation/vite';
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
			name: 'first-mf',
			filename: 'remoteEntry.js',
			exposes: {
				'.': './src/components/Button',
			},
			shared: {
				'solid-js': { singleton: true },
			},
		}),
	],
	build: {
		cssCodeSplit: false,
	},
	server: { port: portMap.firstMf },
	preview: { port: portMap.firstMf },
});
