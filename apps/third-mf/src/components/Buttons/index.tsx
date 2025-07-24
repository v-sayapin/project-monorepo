import { Buttons as SecondMfButtons } from 'secondMf';

import { Button } from 'src/components/Button';
import { SolidContainer } from 'src/components/SolidContainer';

export const Buttons = () => {
	return (
		<>
			<SolidContainer component={SecondMfButtons} />
			<Button />
		</>
	);
};
