import { batch } from 'solid-js';
import type { SetStoreFunction } from 'solid-js/store';
import { createStore as createStoreOriginal } from 'solid-js/store';

type PayloadMap<P = unknown> = Record<string, P>;

type Action<P = unknown> = {
	type: string;
	payload: P;
};
type ActionCreator<P = unknown> = (payload: P) => Action<P>;
type ActionCreatorMap<PM = PayloadMap> = {
	[K in keyof PM]: ActionCreator<PM[K]>;
};

type Reducer<IS = unknown, P = unknown> = (state: IS, action: Action<P>) => IS | undefined;
type ReducerMap<IS = unknown, PM = PayloadMap> = {
	[K in keyof PM]: Reducer<IS, PM[K]>;
};

type Slice<IS = unknown, PM = PayloadMap> = {
	name: string;
	initialState: IS;
	reducers: ReducerMap<IS, PM>;
	actions: ActionCreatorMap<PM>;
};
type StaticSlice<IS = unknown> = { initialState: IS };
type SliceMap = Record<string, Slice | StaticSlice>;

export type State<SM extends SliceMap> = {
	[K in keyof SM]: SM[K]['initialState'];
};

export type Dispatch = (action: Action | Array<Action>) => void;

export type Store<SM extends SliceMap> = {
	state: State<SM>;
	dispatch: Dispatch;
};

export const createSlice = <IS, PM>({
	name,
	initialState,
	reducers,
}: {
	name: string;
	initialState: IS;
	reducers: ReducerMap<IS, PM>;
}): Slice<IS, PM> => {
	const actions = {} as ActionCreatorMap<PM>;
	for (const reducerKey in reducers) {
		actions[reducerKey] = (payload) => ({ type: `${name}/${reducerKey}`, payload });
	}
	return { name, initialState, reducers, actions };
};

export const createStaticSlice = <IS>(initialState: IS): StaticSlice<IS> => ({ initialState });

const UPDATE_STATE = 'STORE/UPDATE_STATE' as const;
type UpdateStateAction<SM extends SliceMap> = Action<Partial<State<SM>>>;

export const updateStateAction = <SM extends SliceMap>(payload: Partial<State<SM>>): UpdateStateAction<SM> => ({
	type: UPDATE_STATE,
	payload,
});

const buildReducerIndex = <SM extends SliceMap>(
	slices: SM,
	state: State<SM>,
	setState: SetStoreFunction<State<SM>>
) => {
	const index: Record<string, (action: Action<SM>) => void> = {};

	for (const sliceKey in slices) {
		const slice = slices[sliceKey];
		if (!('name' in slice)) {
			continue;
		}

		const { name, reducers } = slice;
		for (const reducerKey in reducers) {
			const type = `${name}/${reducerKey}` as const;
			if (index[type]) {
				throw new Error(`[store] duplicate reducer for action «${type}»`);
			}
			index[type] = (action) => {
				const prev = state[sliceKey];
				const next = reducers[reducerKey](prev, action) ?? prev;
				if (next === prev) {
					return;
				}
				// @ts-expect-error TS2345 Костыль
				setState(sliceKey, next);
			};
		}
	}

	return index;
};

export const createStore = <SM extends SliceMap>(slices: SM, preloadedState: Partial<State<SM>> = {}): Store<SM> => {
	const initialState = {} as State<SM>;
	for (const key in slices) {
		initialState[key] = slices[key].initialState;
	}
	for (const key in preloadedState) {
		initialState[key] = preloadedState[key];
	}

	const [state, setState] = createStoreOriginal(initialState);

	const reducerIndex = buildReducerIndex(slices, state, setState);

	const dispatch: Dispatch = (oneOrManyActions) => {
		const actions = Array.isArray(oneOrManyActions) ? oneOrManyActions : [oneOrManyActions];
		batch(() => {
			actions.forEach((action) => {
				if (action.type === UPDATE_STATE) {
					const payload = action.payload as Partial<State<SM>>;
					for (const payloadKey in payload) {
						// @ts-expect-error TS2345 Костыль
						setState(payloadKey, payload[payloadKey]);
					}
				} else {
					reducerIndex[action.type]?.(action as Action<SM>);
				}
			});
		});
	};

	return { state, dispatch };
};
