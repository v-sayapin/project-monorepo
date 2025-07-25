import { spawn } from 'node:child_process';
import { rm } from 'node:fs/promises';
import process from 'node:process';

import { build } from 'esbuild';

/**
 * @type {import('esbuild').BuildOptions}
 */
const options = {
	entryPoints: ['src/server/**'],
	outdir: 'dist/server',

	platform: 'node',
	target: 'node24',
	format: 'esm',

	bundle: false,
	minify: true,
	sourcemap: false,
	tsconfig: 'tsconfig.server.json',

	logLevel: 'info',
	color: true,
};

const cleanDist = async () => rm('dist', { recursive: true, force: true });

const resolvePaths = async () => spawn('tsc-alias', ['-p', 'tsconfig.server.json'], { stdio: 'inherit' });

const main = async () => {
	try {
		await cleanDist();
		await build(options);
		await resolvePaths();
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

void main();
