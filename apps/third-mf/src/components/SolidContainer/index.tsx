import { useLayoutEffect, useRef } from 'react';
import type { Component } from 'solid-js';
import { createComponent } from 'solid-js';
import { render } from 'solid-js/web';

type Props<P extends Record<string, unknown> = Record<string, unknown>> = {
	component: Component<P>;
	props?: P;
};

export const SolidContainer = <P extends Record<string, unknown> = Record<string, unknown>>({
	component,
	props,
}: Props<P>) => {
	const hostRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (!hostRef.current) {
			return;
		}

		const dispose = render(() => createComponent(component, props as P), hostRef.current);

		return () => dispose();
	}, [component, props]);

	return <div ref={hostRef} />;
};
