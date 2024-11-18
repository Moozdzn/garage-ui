import { Stack, Accordion } from '@mantine/core'
import { IconMapPin } from '@tabler/icons-react'
import { useCurrentGarage, useSetViewingGarage } from '../../state'

import { GarageTypesSplit } from '../../state'

import NavBarItem from './NavBarItem'
import { useAtomValue } from 'jotai'
import { useState } from 'react'
import { ButtonWrapper } from '../ButtonWrapper'

const NavBar: React.FC = () => {
	const [accordionValue, setAccordionValue] = useState<string>('')
	const setViewingGarage = useSetViewingGarage()
	const currentGarage = useCurrentGarage()
	const garageTypes = useAtomValue(GarageTypesSplit)

	return (
		<Stack gap='sm'>
			<ButtonWrapper
				leftSection={<IconMapPin size={18} />}
				onClick={() => {
					setViewingGarage({ name: currentGarage.name })
					setAccordionValue(currentGarage.type || 'public')
				}}
			>
				Current
			</ButtonWrapper>
			<Accordion
				value={accordionValue}
				onChange={value => {
					setAccordionValue(value || '')
				}}
				styles={{
					control: {
						borderRadius: 'var(--mantine-radius-md)',
					},
				}}
			>
				{garageTypes.map(garageTypeAtom => (
					<NavBarItem key={`${garageTypeAtom}`} garageTypeAtom={garageTypeAtom} />
				))}
			</Accordion>
		</Stack>
	)
}

export default NavBar
