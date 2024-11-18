import { Paper, Stack, RingProgress, Text, Grid, Group, Center, Loader, PillsInput, Pill, LoadingOverlay } from '@mantine/core'
import classes from '../../../styles/VehicleDetails.module.css'
import type { VehicleKey, VehicleMod, VehicleStat, VehicleUpgrade } from '../../../typings/vehicle'
import { useState } from 'react'
import { BadgeWrapper } from '../../ButtonWrapper'

const ringColor = (value: number) => {
	let color = 'green'
	if (value < 25) {
		color = 'red'
	} else if (value < 50) {
		color = 'orange'
	} else if (value < 75) {
		color = 'yellow'
	}
	return color
}

interface VehicleDetailsProps {
	loading: boolean
	plate: string
	stats: VehicleStat[]
	keys: VehicleKey[]
	modifications: VehicleMod[]
	upgrades: VehicleUpgrade[]
	handleKeyRevoke: (key: VehicleKey) => Promise<boolean>
}

const VehicleDetails: React.FC<VehicleDetailsProps> = ({ loading, stats, keys, modifications, upgrades, handleKeyRevoke }) => {
	const [revokingKey, setRevokingKey] = useState(false)

	if (loading) {
		return (
			<Center>
				<Loader type='dots' color='blue' />
			</Center>
		)
	}

	const removePlayerKey = async (key: VehicleKey) => {
		setRevokingKey(true)
		await handleKeyRevoke(key)
		setRevokingKey(false)
	}

	return (
		<Grid>
			<Grid.Col span={12}>
				<Group>
					{modifications.map(mod => {
						return <BadgeWrapper key={mod.label} >{`${mod.label}: ${mod.value}`}</BadgeWrapper>
					})}
				</Group>
			</Grid.Col>
			<Grid.Col span={{ base: 12, xl: 4 }}>
				<Paper shadow='xs' p='sm' className={classes.cardDetail}>
					{stats.map(stat => (
						<Stack gap='xs' key={stat.label}>
							<Text size='xs' ta='center'>
								{stat.label}
							</Text>
							<RingProgress
								size={60}
								thickness={4}
								sections={[{ value: stat.value, color: ringColor(stat.value) }]}
								label={
									<Text c={ringColor(stat.value)} fw={600} ta='center'>
										{`${stat.value}%`}
									</Text>
								}
							/>
						</Stack>
					))}
				</Paper>
			</Grid.Col>
			<Grid.Col span={{ base: 12, xl: 8 }}>
				<Paper shadow='xs' p='sm' className={classes.cardDetail}>
					{upgrades.map(upgrade => (
						<Stack gap='xs' key={upgrade.label}>
							<Text size='xs' ta='center'>
								{upgrade.label}
							</Text>
							<Text size='md' fw={700} ta='center'>
								{upgrade.value}
							</Text>
						</Stack>
					))}
				</Paper>
			</Grid.Col>
			<Grid.Col span={12}>
				<PillsInput
					label='Keys'
					description='Players who have keys to this vehicle.'
					onClick={e => {
						e.stopPropagation()
					}}
					disabled={revokingKey}
				>
					<LoadingOverlay
						visible={revokingKey}
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
					<Pill.Group>
						{keys.map(key => (
							<Pill key={key.label} color='blue' withRemoveButton onRemove={() => removePlayerKey(key)}>
								{key.label}
							</Pill>
						))}
					</Pill.Group>
				</PillsInput>
			</Grid.Col>
		</Grid>
	)
}

export default VehicleDetails
