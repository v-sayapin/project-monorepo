import { resolve } from 'node:path';

import { federation } from '@module-federation/vite';
import { portMap } from '@project-monorepo/env-config';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
	resolve: {
		alias: {
			src: resolve(import.meta.dirname, 'src'),
		},
	},
	plugins: [
		react(),
		federation({
			name: 'fourthMf',
			filename: 'remoteEntry.js',
			remotes: {
				thirdMf: {
					type: 'module',
					name: 'thirdMf',
					entry: `http://localhost:${portMap.thirdMf}/remoteEntry.js`,
				},
			},
			exposes: {
				'.': './src/components/Buttons',
			},
			shared: {
				'solid-js': { singleton: true },
				react: { singleton: true },
				'react-dom': { singleton: true },
			},
		}),
	],
	build: {
		cssCodeSplit: false,
	},
	server: { port: portMap.fourthMf },
	preview: { port: portMap.fourthMf },
});
