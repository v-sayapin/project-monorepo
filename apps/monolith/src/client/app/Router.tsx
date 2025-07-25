import { Router } from '@solidjs/router';
import type { Component } from 'solid-js';
import { Suspense } from 'solid-js';

import { routes } from 'src/client/app/routes';

export const AppRouter: Component<{ url?: string }> = (props) => {
	return (
		<Suspense>
			<Router url={props.url} explicitLinks>
				{routes}
			</Router>
		</Suspense>
	);
};
