import { resolve } from 'node:path';

import { federation } from '@module-federation/vite';
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
					fourthMf: {
						type: 'module',
						name: 'fourthMf',
						entry: `http://localhost:${portMap.fourthMf}/remoteEntry.js`,
					},
				},
				shared: {
					'solid-js': { singleton: true },
					react: { singleton: true },
					'react-dom': { singleton: true },
				},
			}),
	].filter(Boolean),
	build: {
		manifest: !isSsrBuild,
		outDir: isSsrBuild ? 'dist/server' : 'dist/client',
		rollupOptions: {
			input: resolve(dirname, isSsrBuild ? 'src/render.tsx' : 'src/hydrate.tsx'),
			external: isSsrBuild ? ['fourthMf'] : [],
		},
		target: browserslistToEsbuild(),
		minify: 'esbuild',
		cssMinify: 'esbuild',
		cssCodeSplit: true,
		emptyOutDir: false,
	},
	css: {
		modules: {
			localsConvention: 'camelCaseOnly',
		},
	},
	logLevel: 'info',
}));

export default config;
