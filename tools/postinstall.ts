import { spawn } from 'node:child_process';
import { rm, stat, symlink } from 'node:fs/promises';
import path from 'node:path';

const dirname = import.meta.dirname;
const rootDir = path.resolve(dirname, '..');

const GIT_HOOKS_SRC_DIR = path.resolve(rootDir, 'githooks');
const GIT_HOOKS_DEST_DIR = path.resolve(rootDir, '.git/hooks');

const syncGitHooks = async () => {
	const statResult = await stat(GIT_HOOKS_SRC_DIR);
	if (!statResult.isDirectory()) {
		return;
	}
	await rm(GIT_HOOKS_DEST_DIR, { force: true, recursive: true });
	await symlink(GIT_HOOKS_SRC_DIR, GIT_HOOKS_DEST_DIR);
};

const dedupe = async () =>
	spawn('yarn', ['dedupe'], {
		stdio: 'inherit',
	});

const main = async () => await Promise.all([syncGitHooks(), dedupe()]);

void main();
