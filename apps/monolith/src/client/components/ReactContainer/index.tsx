import type { ComponentType } from 'react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { onCleanup, onMount } from 'solid-js';

type Props<P extends Record<string, unknown> = Record<string, unknown>> = {
	component: ComponentType<P>;
	props?: P;
};

export const ReactContainer = <P extends Record<string, unknown> = Record<string, unknown>>(props: Props<P>) => {
	let container!: HTMLDivElement;
	let root: ReactDOM.Root | undefined = undefined;

	onMount(() => {
		if (!container) {
			return;
		}
		root = ReactDOM.createRoot(container);
		root.render(React.createElement(props.component));
	});

	onCleanup(() => {
		if (!root) {
			return;
		}
		root.unmount();
		root = undefined;
	});

	return <div ref={(element) => (container = element)} />;
};
