import { Divider, Group, Modal, ScrollArea, useMantineColorScheme } from '@mantine/core'
import VehicleSearch from './VehicleSearch'
import VehicleList from './VehicleList'
import VehicleLoadindOverlay from './VehicleLoadindOverlay'
import { useEffect, useRef, useState } from 'react'
import { useViewingGarage } from '../../state'
import { useDisclosure } from '@mantine/hooks'
import { fetchNui } from '../../utils/fetchNui'
import { IconMoon, IconSun } from '@tabler/icons-react'
import { ActionIconWrapper, ButtonWrapper } from '../ButtonWrapper'

type Refundable = { name: string; brand: string; model: string }

const debug = [
	{
		name: 'Lamborghini',
		brand: 'Horse',
		model: 'urus1',
	},
]

const ColorSchemeToggle = () => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme()

	return (
		<ActionIconWrapper color={colorScheme === 'dark' ? 'yellow' : 'gray'} onClick={toggleColorScheme}>
			{colorScheme === 'dark' ? <IconSun /> : <IconMoon />}
		</ActionIconWrapper>
	)
}

const RefundableVehicles = () => {
	const [opened, { open, close }] = useDisclosure(false)
	const [refundable, setRefundable] = useState<Refundable[]>()

	useEffect(() => {
		fetchNui<Refundable[]>('getRefundableVehicles', {}, { data: debug, delay: 750 }).then(setRefundable)
	}, [])

	return (
		<>
			<Modal opened={opened} onClose={close} title='Vehicle list'>
				{refundable?.map((vehicle: { name: string; brand: string; model: string }) => (
					<p key={vehicle.model}>{`${vehicle.brand} ${vehicle.name}`}</p>
				))}
			</Modal>
			<Group>
				<ButtonWrapper onClick={open}>Refundable car list</ButtonWrapper>
				<ColorSchemeToggle />
			</Group>
		</>
	)
}

const VehicleListContainer: React.FC = () => {
	const { name } = useViewingGarage()
	const viewport = useRef<HTMLDivElement>(null)

	// biome-ignore lint/correctness/useExhaustiveDependencies: <name is a necessary dependency as we want to scroll to the top when the name changes>
	useEffect(() => {
		viewport.current?.scrollTo({ top: 0, behavior: 'smooth' })
	}, [name]) //

	return (
		<>
			<Group justify='space-between'>
				<VehicleSearch />
				<RefundableVehicles />
			</Group>
			<Divider mt={10} />
			<ScrollArea h={{ base: 550, xl: 650 }} viewportRef={viewport}>
				<VehicleLoadindOverlay />
				<VehicleList />
			</ScrollArea>
		</>
	)
}

export default VehicleListContainer
