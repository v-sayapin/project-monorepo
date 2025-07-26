import { createSignal } from 'solid-js';

import styles from 'src/components/Button/styles.module.css';

export const Button = () => {
	const [count, setCount] = createSignal(0);

	return (
		<button class={styles.button} onClick={() => setCount((count) => count + 1)}>
			first solid button {count()}
		</button>
	);
};
