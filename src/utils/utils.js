import { DEFAULT_URL } from '../config';

export const getUrl = (pageIndex) => `${DEFAULT_URL}/?page=${pageIndex}`;
