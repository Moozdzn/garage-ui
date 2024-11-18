import { CurrentGarage, GarageGroup } from '../typings/garage'

export const debugInitialData: GarageGroup[] = [
	{ name: 'public', label: 'Public', garages: [], fetched: false},
	{ name: 'house', label: 'Houses', garages: [], fetched: false },
]

export const debugCurrentGarage: CurrentGarage = {
	label: 'Impound lot',
	type: 'public',
	name: 'impound',
	isImpound: true,
}

export const generateGarageGroups = (type: string) => {
  const fetched = false
  if (type === 'public') {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const garages = characters.split('').map((char) => {
      return {
        label: `Garage ${char}`,
        name: `garage${char.toLowerCase()}`,
        type,
        fetched
      }
    })

    return garages
  } else if (type === 'house') {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const garages = characters.split('').map((char) => {
      return {
        label: `House ${char}`,
        name: `house${char.toLowerCase()}`,
        type,
        fetched
      }
    })

    return garages
  }

  return []
}