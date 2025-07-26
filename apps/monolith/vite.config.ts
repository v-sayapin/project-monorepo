import { resolve } from 'node:path';

import federation from '@originjs/vite-plugin-federation';
import { portMap } from '@project-monorepo/env-config';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import devtools from 'solid-devtools/vite';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

const dirname = import.meta.dirname;

const config = defineConfig(({ isSsrBuild }) => ({
	resolve: {
		alias: {
			'src/client': resolve(dirname, 'src/client'),
		},
	},
	plugins: [
		devtools({ autoname: true }),
		solid({ ssr: true, solid: { hydratable: true } }),
		!isSsrBuild &&
			federation({
				name: 'monolith',
				filename: 'remoteEntry.js',
				remotes: {
					fourthMf: `http://localhost:${portMap.fourthMf}/assets/remoteEntry.js`,
				},
				shared: ['solid-js', 'react', 'react-dom'],
			}),
	].filter(Boolean),
	build: {
		manifest: !isSsrBuild,
		outDir: isSsrBuild ? 'dist/server' : 'dist/client',
		rollupOptions: {
			input: resolve(dirname, isSsrBuild ? 'src/render.tsx' : 'src/hydrate.tsx'),
			external: isSsrBuild ? ['fourthMf/Buttons'] : [],
		},
		target: browserslistToEsbuild(),
		minify: 'esbuild',
		cssMinify: 'lightningcss',
		cssCodeSplit: true,
		emptyOutDir: false,
	},
	css: {
		transformer: 'lightningcss',
	},
	logLevel: 'info',
}));

export default config;
