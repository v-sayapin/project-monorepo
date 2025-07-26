import { resolve } from 'node:path';
import { env } from 'node:process';

import { config } from 'dotenv';

config({ path: resolve(import.meta.dirname, '../../.env'), quiet: true });

export const portMap = {
	monolith: Number(env.MONOLITH_PORT) || 2000,
	firstMf: Number(env.FIRST_MF_PORT) || 2001,
	secondMf: Number(env.SECOND_MF_PORT) || 2002,
	thirdMf: Number(env.THIRD_MF_PORT) || 2003,
	fourthMf: Number(env.FOURTH_MF_PORT) || 2004,
} as const;

export type PortMap = (typeof portMap)[keyof typeof portMap];

const domain = env.HOST || 'localhost';

export const getHost = (port: PortMap) => `https://${domain}:${port}`;
