import React from 'react';
import { createSignal, onMount, Show } from 'solid-js';
import { isServer } from 'solid-js/web';

import { Nav } from 'src/client/components/Nav';
import { ReactContainer } from 'src/client/components/ReactContainer';

const IndexPage = () => {
	const [FourthMfButtons, setFourthMfButtons] = createSignal<React.ComponentType | null>(null);

	onMount(async () => {
		if (isServer) {
			return;
		}
		const module = await import('fourthMf/Buttons');
		setFourthMfButtons(() => module.default.Buttons);
	});

	return (
		<div>
			<Nav />
			Index page
			<Show when={FourthMfButtons()}>{(Component) => <ReactContainer component={Component()} />}</Show>
		</div>
	);
};

export default IndexPage;
