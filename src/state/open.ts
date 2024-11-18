import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

const open = atom("")

export const useOpen = () => useAtomValue(open)
export const useSetOpen = () => useSetAtom(open)
export const useOpenState = () => useAtom(open)