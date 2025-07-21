import type { Component } from 'solid-js';

import { SpaLink } from 'src/client/components/SpaLink';
import { useState } from 'src/client/hooks/store';
import { useSpaNavigate } from 'src/client/hooks/useSpaNavigate';

import styles from 'src/client/components/Nav/styles.module.css';

export const Nav: Component = () => {
	const { title } = useState().pageMetaData;
	const { spaNavigate } = useSpaNavigate();

	return (
		<>
			<div>title state from bff: {title}</div>
			<nav class={styles.nav}>
				<SpaLink href='/'>Go to Index page</SpaLink>
				<SpaLink href='/search'>Go to Search page</SpaLink>
				<SpaLink href='/catalog'>Go to Catalog page</SpaLink>
				<button onClick={() => spaNavigate('/')}>Go to Index page</button>
				<button onClick={() => spaNavigate('/search')}>Go to Search page</button>
				<button onClick={() => spaNavigate('/catalog')}>Go to Catalog page</button>
			</nav>
		</>
	);
};
