import { renderToStream } from 'solid-js/web';

import type { AppProps } from 'src/client/app/App';
import { App } from 'src/client/app/App';

export const render = (props: Required<AppProps>) => renderToStream(() => <App {...props} />);
