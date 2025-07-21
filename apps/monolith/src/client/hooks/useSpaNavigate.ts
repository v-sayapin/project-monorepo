import { useNavigate } from '@solidjs/router';
import { onCleanup } from 'solid-js';

import { updateStateAction } from 'src/client/app/store/internal';
import { useDispatch } from 'src/client/hooks/store';

let controller: AbortController;

export const useSpaNavigate = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	onCleanup(() => controller?.abort());

	const spaNavigate = async (href: string) => {
		controller?.abort();
		controller = new AbortController();

		try {
			const response = await fetch(href, {
				headers: { Accept: 'application/json' },
				signal: controller.signal,
			});

			if (!response.ok) {
				console.error(`[spa] failed to fetch "${href}": ${response.status} ${response.statusText}`);
				return;
			}

			const data = await response.json();
			dispatch(updateStateAction(data));

			navigate(href, { replace: true });
		} catch (error) {
			if ((error as DOMException).name === 'AbortError') {
				console.warn(`[spa] request to "${href}" is aborted`, error);
			} else {
				console.error(error);
			}
		}
	};

	return { spaNavigate };
};
