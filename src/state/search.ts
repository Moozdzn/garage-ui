import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

const searchAtom = atom<string>('');
export const useSearchState = () => useAtom(searchAtom);
export const useSearch = () => useAtomValue(searchAtom);
export const useSetSearch = () => useSetAtom(searchAtom);