import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { ViewingGarage } from '../../typings/garage'
import { currentGarageAtom } from '.'

export const viewingGarageAtom = atom<Omit<ViewingGarage, 'isCurrent'>>({
	name: ''
})

const composedViewingGarageAtom = atom(
	get => {
		const garages = get(currentGarageAtom)
		const viewing = get(viewingGarageAtom)

		return {
			...viewing,
			isCurrent: garages.name === viewing.name,
		}
	},
	(get, set, update: Partial<ViewingGarage>) => {
		set(viewingGarageAtom, {
			...get(viewingGarageAtom),
			...update,
		})
	}
)

export const useViewingGarageState = () => useAtom(composedViewingGarageAtom)
export const useViewingGarage = () => useAtomValue(composedViewingGarageAtom)
export const useSetViewingGarage = () => useSetAtom(composedViewingGarageAtom)
