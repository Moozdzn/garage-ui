import { Vehicle } from './vehicle'

export interface Garage {
	label: string
	name: string
	vehicles: Vehicle[]
    fetched: boolean
}

export interface CurrentGarage {
	label: string
	name: string
	type: string
	isImpound: boolean,
}

export interface ViewingGarage {
	name: string
	isCurrent: boolean
}

export interface GarageGroup {
	label: string
	name: string
	garages: Garage[]
    fetched: boolean
}