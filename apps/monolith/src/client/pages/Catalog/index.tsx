import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';

import { Nav } from 'src/client/components/Nav';

const CatalogPage: Component = () => {
	const [count, setCount] = createSignal(0);

	return (
		<div>
			<Nav />
			Index page
			<button
				type='button'
				onClick={() => {
					setCount((prevState) => prevState + 100);
				}}>
				{count()}
			</button>
		</div>
	);
};

export default CatalogPage;
