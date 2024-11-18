import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import type { CurrentGarage } from '../../typings/garage'

export const currentGarageAtom = atom<CurrentGarage>({
    type: '',
    name: '',
    label: '',
    isImpound: false,
})

export const useCurrentGarageState = () => useAtom(currentGarageAtom)
export const useCurrentGarage = () => useAtomValue(currentGarageAtom)
export const useSetCurrentGarage = () => useSetAtom(currentGarageAtom)




export interface GarageType {
    label: string
    name: string
    fetched: boolean
}

export interface Garage {
    label: string
    name: string
    type: string
    fetched: boolean
}

import type { Vehicle } from '../../typings/vehicle'
import { splitAtom } from 'jotai/utils'

export const GarageTypes = atom<GarageType[]>([])
export const useGarageTypes = () => useAtomValue(GarageTypes)
export const useSetGarageTypes = () => useSetAtom(GarageTypes)
export const useGarageTypesState = () => useAtom(GarageTypes)

export const GarageTypesSplit = splitAtom(GarageTypes)

export const Garages = atom<Garage[]>([])
export const useGarages = () => useAtomValue(Garages)
export const useSetGarages = () => useSetAtom(Garages)
export const useGaragesState = () => useAtom(Garages)

export const Vehicles = atom<Vehicle[]>([])
export const useVehicles = () => useAtomValue(Vehicles)
export const useSetVehicles = () => useSetAtom(Vehicles)
export const useVehiclesState = () => useAtom(Vehicles)