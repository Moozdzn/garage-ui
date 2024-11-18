import { Group, Tooltip } from '@mantine/core'
import {
	IconCar,
	IconCarOff,
	IconSortAscendingLetters,
	IconSortDescendingLetters,
	IconSortAscendingNumbers,
	IconSortDescendingNumbers,
} from '@tabler/icons-react'
import { useCurrentGarage, useFilterStateState, useViewingGarage } from '../../state'
import { ActionIconWrapper } from '../ButtonWrapper'

const buttonStyles = { width: '70%', height: '70%' }


function VehicleFilterMenu() {
	const [filterState, setFilterState] = useFilterStateState()

	const handleFilter = (key: string) => {
		setFilterState(prev => {
			const order = prev.key === key ? (prev.order === 'asc' ? 'desc' : 'asc') : 'asc'
			return {
				key,
				order,
			}
		})
	}

	const { isCurrent } = useViewingGarage()
	const { isImpound } = useCurrentGarage()

	const showPrice = isCurrent && isImpound
	const showAvailable = !isCurrent || (isCurrent && !isImpound)

	return (
		<Group grow wrap='nowrap'>
			<Tooltip label='Sort by name' position='top' withArrow>
				<ActionIconWrapper
					color={filterState.key === 'name' ? 'blue' : 'gray'}
					aria-label='Name'
					onClick={() => handleFilter('name')}
				>
					{filterState.key === 'name' && filterState.order === 'desc' ? (
						<IconSortDescendingLetters style={buttonStyles} stroke={1.5} />
					) : (
						<IconSortAscendingLetters style={buttonStyles} stroke={1.5} />
					)}
				</ActionIconWrapper>
			</Tooltip>
			{showAvailable && (
				<Tooltip label='Sort by availability' position='top' withArrow>
					<ActionIconWrapper
						color={filterState.key === 'available' ? 'blue' : 'gray'}
						aria-label='Available'
						onClick={() => handleFilter('available')}
					>
						{filterState.key === 'available' && filterState.order === 'desc' ? (
							<IconCarOff style={buttonStyles} stroke={1.5} />
						) : (
							<IconCar style={buttonStyles} stroke={1.5} />
						)}
					</ActionIconWrapper>
				</Tooltip>
			)}
			{showPrice && (
				<Tooltip label='Sort by price' position='top' withArrow>
					<ActionIconWrapper
						color={filterState.key === 'price' ? 'blue' : 'gray'}
						aria-label='Price'
						onClick={() => handleFilter('price')}
					>
						{filterState.key === 'price' && filterState.order === 'desc' ? (
							<IconSortDescendingNumbers style={buttonStyles} stroke={1.5} />
						) : (
							<IconSortAscendingNumbers style={buttonStyles} stroke={1.5} />
						)}
					</ActionIconWrapper>
				</Tooltip>
			)}
		</Group>
	)
}

export default VehicleFilterMenu
