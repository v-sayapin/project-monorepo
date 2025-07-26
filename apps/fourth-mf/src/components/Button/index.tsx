import React from 'react';

import styles from 'src/components/Button/styles.module.css';

export const Button = () => {
	const [count, setCount] = React.useState(0);

	return (
		<button className={styles.button} onClick={() => setCount((count) => count + 1)}>
			fourth react button {count}
		</button>
	);
};
