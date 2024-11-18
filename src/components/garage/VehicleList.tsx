import { IconCarOff } from '@tabler/icons-react'
import { Vehicle } from '../../typings/vehicle'
import { VehicleState } from '../../enum/state'
import {
	FilterState,
	useCurrentGarage,
	useFilterState,
	useSearch,
	useVehicles,
	useViewingGarage,
} from '../../state'
import NotFound from '../NotFound'
import { useSetOpen } from '../../state/open'
import VehicleCard from './vehicle/VehicleCard'
import { useCitizenid } from '../../state/citizenid'

const doesTextPartiallyMatch = (text: string, search: string) => {
	return text.toLowerCase().includes(search.toLowerCase())
}

const applyOrderFilter = (vehicles: Vehicle[], filter: FilterState) => {
	const newArray = [...vehicles]
	
	if (filter.key === 'available') {
		newArray.sort((a, b) => {
			if (a.state.value === VehicleState.INSIDE && b.state.value !== VehicleState.INSIDE) {
				return -1
			}
			if (a.state.value === VehicleState.OUT && b.state.value === VehicleState.CONFISCATED) {
				return -1
			}
			return 0
		})
		

		if (filter.order === 'desc') {
			newArray.reverse()
		}
		
	} else if (filter.key === 'price') {
		// if asc order vehicles by impound price
		newArray.sort((a, b) => a.impound - b.impound)
		if (filter.order === 'desc') {
			newArray.reverse()
		}
	} else {
		// if asc order vehicles by label
		newArray.sort((a, b) => a.label.localeCompare(b.label))
		if (filter.order === 'desc') {
			newArray.reverse()
		}
	}

	return newArray
}

const VehicleList: React.FC = () => {
	const setOpen = useSetOpen()
	const viewingGarage = useViewingGarage()
	const vehicles = useVehicles()
	const filter = useFilterState()
	const citizenid = useCitizenid()

	const { isImpound } = useCurrentGarage()

	const search = useSearch()

	const garageAndTextFiltered = vehicles
		.filter((vehicle: Vehicle) => {
			if (viewingGarage.isCurrent && isImpound) {
				return vehicle.impound !== undefined && vehicle.state.value === VehicleState.OUT && vehicle.citizenid === citizenid
			}

			return vehicle.garage === viewingGarage.name
		}).filter((vehicle: Vehicle) => doesTextPartiallyMatch(vehicle.label, search) || doesTextPartiallyMatch(vehicle.plate, search))

	const filteredVehicles = applyOrderFilter(garageAndTextFiltered, filter)
		.map((vehicle: Vehicle) => vehicle.plate)

	const handleOpen = (plate: string) => {
		setOpen(prevOpen => (prevOpen === plate ? '' : plate))
	}

	return (
		<>
			{(filteredVehicles.length > 0 &&
				filteredVehicles.map(plate => {
					const VehicleCardProps = {
						handleClick: handleOpen,
						plate,
					}

					return <VehicleCard {...VehicleCardProps} key={plate} />
				})) || <NotFound Icon={IconCarOff} message='No vehicles found.' />}
		</>
	)
}

export default VehicleList
