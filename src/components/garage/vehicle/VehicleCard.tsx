import { Group, Stack, Collapse, Text, Paper } from '@mantine/core'
import VehicleDetails from './VehicleDetails'
import type { Vehicle, VehicleKey } from '../../../typings/vehicle'
import classes from '../../../styles/VehicleCard.module.css'
import { fetchNui } from '../../../utils/fetchNui'
import { VehicleState } from '../../../enum/state'
import { useCurrentGarage, useSetRetriveVehicle, useVehiclesState, useViewingGarage } from '../../../state'
import { useOpen } from '../../../state/open'
import VehicleCardButton from './VehicleCardButton'
import { useState } from 'react'
import { generateVehicleDetails } from '../../../dev/debugVehicles'
import VehicleCardState from './VehicleCardState'

type VehicleProps = {
	handleClick: (plate: string) => void
	plate: string
}

const emptyVehicle: Vehicle = {
	label: 'Unknown',
	plate: 'UNK000',
	impound: 0,
	modifications: [],
	state: { value: VehicleState.CONFISCATED, label: 'UNKNOWN' },
	upgrades: [],
	keys: [],
	stats: [],
	fetched: true,
	citizenid: '',
	unavailable: false,
	refunds: { ves: false, headlight: false, customPlate: false },
	garage: '',
}

const VehicleCard: React.FC<VehicleProps> = ({ handleClick, plate }) => {
	const { name: garage } = useCurrentGarage()
	const setRetrieve = useSetRetriveVehicle()
	const { isCurrent, name } = useViewingGarage()
	const open = useOpen()
	const [vehicleList, setVehicleList] = useVehiclesState()
	const [detailsLoading, setDetailsLoading] = useState(false)
	const vehicle = vehicleList.find((vehicle: Vehicle) => vehicle.plate === plate) || { ...emptyVehicle, garage: name }

	const detailsOpen = open === plate

	const openVehicleDetails = async () => {
		handleClick(vehicle.plate)
		if (!vehicle.fetched) {
			setDetailsLoading(true)
			const result = await fetchNui('getVehicleDetails', { plate }, { data: generateVehicleDetails(), delay: 1000 })
			vehicle.stats = result.stats
			vehicle.upgrades = result.upgrades
			vehicle.modifications = result.modifications
			vehicle.keys = result.keys
			vehicle.fetched = true
			setVehicleList([...vehicleList])
			setDetailsLoading(false)
		}
	}

	const handleVehicleRetrieve = async (retrieve: boolean) => {
		setRetrieve(vehicle.plate)
		const {status, label} = await fetchNui('retrieveVehicle', { garage, plate: vehicle.plate, retrieve }, { data: {status: true, label: "Inside"}, delay: 1000 })
		setRetrieve('')
		if (status) {
			if (retrieve) {
				vehicle.state = { value: VehicleState.OUT, label }
			} else {
				vehicle.state = { value: VehicleState.INSIDE, label }
			}

			setVehicleList([...vehicleList])
		}
	}

	const handleKeyRevoke = async (key: VehicleKey) => {
		const result = await fetchNui('removeKey', { citizenid: key.value, plate: vehicle.plate }, { data: true, delay: 750 })
		if (result) {
			vehicle.keys = vehicle.keys.filter(k => k.value !== key.value)
			setVehicleList([...vehicleList])
		}
		return result
	}

	return (
		<Paper mx='auto' className={classes.container} onClick={openVehicleDetails} px='md' py='xs' my='xs' radius="md" shadow='xs'>
			<Group justify='space-between'>
				<Stack>
					<VehicleCardState vehicle={vehicle} />
					<Group>
						<Text>
							{vehicle.plate} | {vehicle.label}
						</Text>
					</Group>
				</Stack>
				{isCurrent && <VehicleCardButton vehicle={vehicle} handleVehicleRetrieve={handleVehicleRetrieve} />}
			</Group>

			<Collapse in={detailsOpen} mt='md'>
				<VehicleDetails
					loading={detailsLoading}
					plate={vehicle.plate}
					stats={vehicle.stats}
					upgrades={vehicle.upgrades}
					modifications={vehicle.modifications}
					keys={vehicle.keys}
					handleKeyRevoke={handleKeyRevoke}
				/>
			</Collapse>
		</Paper>
	)
}

export default VehicleCard
