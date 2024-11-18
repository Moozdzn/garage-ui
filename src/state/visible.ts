import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';

const visibleAtom = atom<boolean>(false);

export const useVisibleState = () => useAtom(visibleAtom);
export const useVisible = () => useAtomValue(visibleAtom);
export const useSetVisible = () => useSetAtom(visibleAtom);