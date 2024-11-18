import { Grid, Burger, Transition, Stack, Title, Paper } from '@mantine/core'
import VehicleListContainer from './components/garage/VehicleListContainer'
import NavBar from './components/nav/NavBar'
import classes from './styles/App.module.css'
import { useEffect } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { debugCurrentGarage, debugInitialData } from './dev/debugGarages'
import { useNuiEvent } from './hooks/useNuiEvent'
import { fetchNui } from './utils/fetchNui'
import { debugData } from './utils/debugData'
import { isEnvBrowser } from './utils/misc'
import type { CurrentGarage, GarageGroup, ViewingGarage } from './typings/garage'
import {
	useSetOpen,
	useVisibleState,
	useCurrentGarageState,
	useSetViewingGarage,
	useSetGarageTypes,
	useSetGarages,
	useSetVehicles,
	useSetRetriveVehicle,
	useSetLoading,
} from './state'
import { generateVehicles } from './dev/debugVehicles'
import type { Vehicle } from './typings/vehicle'
import { useSetCitizenidState } from './state/citizenid'

export default function App() {
	const [visible, setVisible] = useVisibleState()
	const [currentGarage, setCurrentGarage] = useCurrentGarageState()
	const setViewingGarage = useSetViewingGarage()
	const [opened, { toggle }] = useDisclosure()
	const setGarageTypes = useSetGarageTypes()
	const setGarages = useSetGarages()
	const setVehicles = useSetVehicles()
	const setRetrieveVehicle = useSetRetriveVehicle()
	const setLoading = useSetLoading()
	const setOpen = useSetOpen()
	const setCitizenid = useSetCitizenidState()

	const changeViewingGarage = (data?: Partial<ViewingGarage>) => {
		if (!data) return setViewingGarage({ name: currentGarage.name })
		setViewingGarage(data)
	}

	const resetStates = () => {
		setGarageTypes(prev => prev.map(group => ({ ...group, fetched: false })))
		setGarages([])
		setVehicles([])
		setRetrieveVehicle('')
		setLoading(false)
		setOpen('')
		setViewingGarage({ name: '' })
	}

	useNuiEvent<{ visible: boolean; garage: CurrentGarage; vehicles: Vehicle[]; citizenid: string }>('setVisible', data => {
		if (data.garage) {
			setCitizenid(data.citizenid)
			setCurrentGarage(data.garage)
			changeViewingGarage({ name: data.garage.name })
			const garages = {
				label: data.garage.label,
				name: data.garage.name,
				type: data.garage.type,
				fetched: true,
			}
			setGarages([garages])
			const garageVehicles = data.vehicles.map(vehicle => ({
				...vehicle,
				stats: [],
				modifications: [],
				keys: [],
				upgrades: [],
				fetched: false,
			}))
			setVehicles(garageVehicles)
			setGarageTypes(prev => prev.map(group => ({ ...group, fetched: false })))
		} else {
			resetStates()
		}
		setVisible(data.visible)
	})

	useNuiEvent<GarageGroup[]>('setInitialData', data => {
		const garageTypes = data.map(group => {
			return {
				...group,
				garages: [],
				fetched: false,
			}
		})
		setGarageTypes(garageTypes)
	})

	useEffect(() => {
		const handleESC = (e: KeyboardEvent) => {
			if (visible && e.key === 'Escape') {
				resetStates()
				setVisible(false)
				fetchNui('hide')
			}
		}

		window.addEventListener('keydown', handleESC)
		return () => window.removeEventListener('keydown', handleESC)
	}, [visible])

	useEffect(() => {
		if (isEnvBrowser()) {
			setTimeout(() => {
				debugData([
					{
						action: 'setInitialData',
						data: debugInitialData,
					},
				])
				debugData([
					{
						action: 'setVisible',
						data: {
							visible: true,
							garage: debugCurrentGarage,
							vehicles: generateVehicles(15, debugCurrentGarage.isImpound ? 'garagea' : debugCurrentGarage.name),
							citizenid: 'AMN20902',
						},
					},
				])
			}, 1000)
		} else {
			fetchNui('getInitialData')
		}
	}, [])

	return (
		<Transition transition='slide-up' mounted={visible}>
			{style => (
				<Paper
					className={classes.container}
					style={{...style, opacity: 0.9}}
					id='ui-container'
					p='xs'
					radius={'md'}
					shadow='xs'
				>
					<Title order={4} ta='center' py={5}>
						Currently at {currentGarage.label}
					</Title>
					<Grid>
						<Grid.Col span={opened ? 3 : 1}>
							<Stack gap={0}>
								<Burger opened={opened} onClick={toggle} aria-label='Toggle navigation' />
								{opened && <NavBar />}
							</Stack>
						</Grid.Col>
						<Grid.Col span={opened ? 9 : 11}>{currentGarage && <VehicleListContainer />}</Grid.Col>
					</Grid>
				</Paper>
			)}
		</Transition>
	)
}
