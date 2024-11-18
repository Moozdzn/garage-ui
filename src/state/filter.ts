import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
export interface FilterState {
    key: string
    order: 'asc' | 'desc'
}

const filterState = atom<FilterState>({ key: 'name', order: 'asc' })
export const useFilterState = () => useAtomValue(filterState)
export const useSetFilterState = () => useSetAtom(filterState)
export const useFilterStateState = () => useAtom(filterState)