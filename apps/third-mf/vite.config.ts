import { resolve } from 'node:path';

import federation from '@originjs/vite-plugin-federation';
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
			name: 'thirdMf',
			filename: 'remoteEntry.js',
			remotes: {
				secondMf: `http://localhost:${portMap.secondMf}/assets/remoteEntry.js`,
			},
			exposes: {
				'./Buttons': './src/components/Buttons',
			},
			shared: ['solid-js', 'react', 'react-dom'],
		}),
	],
	build: {
		cssCodeSplit: false,
	},
	server: { port: portMap.thirdMf },
	preview: { port: portMap.thirdMf },
});
