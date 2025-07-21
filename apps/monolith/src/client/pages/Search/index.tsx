import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';

import { Nav } from 'src/client/components/Nav';

import styles from 'src/client/pages/Search/styles.module.css';

import image from 'src/client/pages/Search/assets/image.jpg';

const SearchPage: Component = () => {
	const [count, setCount] = createSignal(10);

	return (
		<div>
			<Nav />
			Search page
			<button
				type='button'
				onClick={() => {
					setCount((prevState) => prevState + 10);
				}}>
				{count()}
			</button>
			<input class={styles.input} />
			<img src={image} alt='image' />
		</div>
	);
};

export default SearchPage;
