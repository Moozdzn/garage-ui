import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

const citizenidAtom = atom('')

export const useCitizenid= () => useAtomValue(citizenidAtom)
export const useSetCitizenidState = () => useSetAtom(citizenidAtom)
export const useCitizenidState = () => useAtom(citizenidAtom)
