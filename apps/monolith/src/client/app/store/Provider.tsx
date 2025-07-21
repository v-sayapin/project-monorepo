import type { ParentComponent } from 'solid-js';
import { createContext } from 'solid-js';

import type { AppState, AppStore } from 'src/client/app/store';
import { slices } from 'src/client/app/store';
import { createStore } from 'src/client/app/store/internal';

export const StoreContext = createContext<AppStore>();

export const StoreProvider: ParentComponent<{ initialState?: Partial<AppState> }> = (props) => {
	const store = createStore(slices, props.initialState);

	return <StoreContext.Provider value={store}>{props.children}</StoreContext.Provider>;
};
