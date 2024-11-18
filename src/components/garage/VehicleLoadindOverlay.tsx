import { LoadingOverlay } from '@mantine/core'
import { useLoading } from '../../state'

const VehicleLoadindOverlay: React.FC = () => {
	const loading = useLoading()
	return (
		<LoadingOverlay
			visible={loading}
			zIndex={1000}
			overlayProps={{ radius: 'md', blur: 1 }}
			loaderProps={{ type: 'dots' }}
			transitionProps={{ duration: 250 }}
			/* styles={{
				overlay: {
					backgroundColor: 'var(--mantine-color-dark-8)',
				},
			}} */
		/>
	)
}

export default VehicleLoadindOverlay
