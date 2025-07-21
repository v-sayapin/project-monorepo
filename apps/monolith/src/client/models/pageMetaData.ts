import { createStaticSlice } from 'src/client/app/store/internal';

type PageMetaData = {
	title: string;
};

export const pageMetaData = createStaticSlice<PageMetaData>({ title: '' });
