import type { State, Store } from 'src/client/app/store/internal';
import { pageMetaData } from 'src/client/models/pageMetaData';

export const slices = {
	pageMetaData,
};

export type AppSlices = typeof slices;
export type AppState = State<AppSlices>;
export type AppStore = Store<typeof slices>;
