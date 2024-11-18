import { UnstyledButton, Stack, Accordion, Text, Loader, Center } from '@mantine/core'
import { IconCarGarage, IconMapPin, IconHome, type Icon } from '@tabler/icons-react'
import { useState } from 'react'
import { Garage, GarageType, useGaragesState, useSetLoading, useSetVehicles, useViewingGarageState } from '../../state'
import classes from '../../styles/NavBar.module.css'
import { fetchNui } from '../../utils/fetchNui'
import { generateGarageGroups } from '../../dev/debugGarages'
import { generateVehicles } from '../../dev/debugVehicles'
import { PrimitiveAtom, useAtom } from 'jotai'

const icons: Record<string, Icon> = {
	current: IconMapPin,
	public: IconCarGarage,
	house: IconHome,
}

interface Props {
	garageTypeAtom: PrimitiveAtom<GarageType>
}

const NavBarItem: React.FC<Props> = ({ garageTypeAtom }) => {
	const [viewingGarage, setViewingGarage] = useViewingGarageState()
	const [garages, setGarages] = useGaragesState()
	const [loading, setLoading] = useState(false)
	const setVehiclesLoading = useSetLoading()
	const setVehicles = useSetVehicles()
	const [garageType, setGarageType] = useAtom(garageTypeAtom)

	const fetchGarageList = async () => {
		if (garageType.fetched) return
		setLoading(true)
		const result = await fetchNui('getGarages', { garageType: garageType.name }, { data: generateGarageGroups(garageType.name), delay: 1000 })
		const garages = result.map(garage => ({ ...garage, fetched: false, type: garageType.name }))
		setGarages(prev => {
			const notPresent = garages.filter(garage => !prev.find(g => g.name === garage.name))
			return [...prev, ...notPresent]
		})
		setGarageType(prev => ({ ...prev, fetched: true }))
		setLoading(false)
	}

	const changeViewingGarage = async (garage: Garage) => {
		if (!garage.fetched) {
			setVehiclesLoading(true)
			const result = await fetchNui('getGarageVehicles', { name: garage.name }, { data: generateVehicles(15, garage.name), delay: 1000 })
			setVehicles(prev => {
				const notPresent = result
					.filter(vehicle => !prev.find(v => v.plate === vehicle.plate))
					.map(vehicle => ({
						...vehicle,
						stats: [],
						modifications: [],
						keys: [],
						upgrades: [],
						fetched: false
					}))
				return [...prev, ...notPresent]
			})
			setGarages(prev => prev.map(g => (g.name === garage.name ? { ...g, fetched: true } : g)))
			setVehiclesLoading(false)
		}
		setViewingGarage({ ...viewingGarage, ...garage })
	}

	const filteredGarages = garages.filter(garage => garage.type === garageType.name)

	const Icon = icons[garageType.name]
	return (
		<Accordion.Item key={garageType.name} value={garageType.name}>
			<Accordion.Control icon={<Icon size={18} />} h={50} onClick={fetchGarageList}>
				<Text>{garageType.label}</Text>
			</Accordion.Control>
			<Accordion.Panel>
				{loading && (
					<Center>
						<Loader type='dots' />
					</Center>
				)}
				<Stack gap='xs' style={{ maxHeight: 350, overflow: 'scroll' }}>
					{filteredGarages.map(garage => {
						const isSelected = viewingGarage.name === garage.name
						return (
							<UnstyledButton
								className={classes.garageButton}
								data-selected={isSelected}
								key={garage.name}
								onClick={() => changeViewingGarage(garage)}
							>
								{garage.label}
							</UnstyledButton>
						)
					})}
				</Stack>
			</Accordion.Panel>
		</Accordion.Item>
	)
}

export default NavBarItem
