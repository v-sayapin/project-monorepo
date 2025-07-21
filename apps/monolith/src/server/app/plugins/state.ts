import type { FastifyPluginAsync } from 'fastify';
import plugin from 'fastify-plugin';

type State = Record<string, unknown>;

declare module 'fastify' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface FastifyInstance {
		state: State;
		putState: (patch: State) => void;
	}
}

const assign = (a: State, b: State) => Object.keys(b).forEach((key) => (a[key] = b[key]));

const statePluginDecorator: FastifyPluginAsync = async (fastify) => {
	fastify.decorate('state', {});
	fastify.decorate('putState', (patch: State) => assign(fastify.state, patch));
};

export const statePlugin = plugin(statePluginDecorator, { name: 'state' });
