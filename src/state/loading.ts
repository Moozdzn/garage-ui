import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';

const loadingAtom = atom(false);

export const useLoading = () => useAtomValue(loadingAtom);
export const useSetLoading = () => useSetAtom(loadingAtom);
export const useLoadingState = () => useAtom(loadingAtom);

const retriveVehicleAtom = atom<string>('');
export const useRetriveVehicle = () => useAtomValue(retriveVehicleAtom);
export const useSetRetriveVehicle = () => useSetAtom(retriveVehicleAtom);
export const useRetriveVehicleState = () => useAtom(retriveVehicleAtom);