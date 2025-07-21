import type { RouteDefinition } from '@solidjs/router';
import { lazy } from 'solid-js';

export const routes: Array<RouteDefinition> = [
	{ path: '/', component: lazy(() => import('src/client/pages/Index')) },
	{ path: '/search', component: lazy(() => import('src/client/pages/Search')) },
	{ path: '/catalog', component: lazy(() => import('src/client/pages/Catalog')) },
];
