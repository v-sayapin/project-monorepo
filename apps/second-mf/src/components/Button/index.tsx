import { createSignal } from 'solid-js';

import 'src/components/Button/styles.css';

export const Button = () => {
	const [count, setCount] = createSignal(0);

	return (
		<button class='button' onClick={() => setCount((count) => count + 1)}>
			second solid button {count()}
		</button>
	);
};
