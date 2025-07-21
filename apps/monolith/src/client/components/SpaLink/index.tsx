import type { AnchorProps } from '@solidjs/router';
import { A } from '@solidjs/router';
import type { ParentComponent } from 'solid-js';

import { useSpaNavigate } from 'src/client/hooks/useSpaNavigate';

type SpaLinkProps = AnchorProps & {
	href: string;
	onClick?: (event: MouseEvent) => void;
};

export const SpaLink: ParentComponent<SpaLinkProps> = (props) => {
	const { spaNavigate } = useSpaNavigate();

	const handleClick = async (event: MouseEvent) => {
		event.preventDefault();
		props.onClick?.(event);
		await spaNavigate(props.href);
	};

	return (
		<A {...props} onClick={handleClick}>
			{props.children}
		</A>
	);
};
