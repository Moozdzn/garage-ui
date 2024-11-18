import { Group, Input } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { useSearchState, useLoading } from '../../state'
import VehicleFilterMenu from './VehicleFilterMenu'
import { useEffect } from 'react'

interface Props {
	placeholder?: string
}

const VehicleSearch: React.FC<Props> = ({ placeholder }) => {
	const [search, setSearch] = useSearchState()
	const loading = useLoading()

	useEffect(() => {
		return () => setSearch('')
	}, [])

	return (
		<Group wrap='nowrap' justify='flex-start'>
			<Input
				placeholder={placeholder || 'Search...'}
				value={search}
				leftSection={<IconSearch size={16} />}
				onChange={event => setSearch(event.currentTarget.value)}
				disabled={loading}
				
				m={0}
			/>
			
			<VehicleFilterMenu />
		</Group>
	)
}

export default VehicleSearch
