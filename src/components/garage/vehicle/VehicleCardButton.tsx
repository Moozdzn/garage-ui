import { Group, Tooltip, Text, Menu } from '@mantine/core'
import { IconBackpack, IconCar, IconCoins } from '@tabler/icons-react'
import { useCurrentGarage, useGarages, useRetriveVehicle, useSetVehicles } from '../../../state'
import type { Vehicle } from '../../../typings/vehicle'
import { VehicleState } from '../../../enum/state'
import { fetchNui } from '../../../utils/fetchNui'
import { ButtonWrapper } from '../../ButtonWrapper'

interface ButtonProps {
	handleVehicleRetrieve: (retrieve: boolean) => void
	vehicle: Vehicle
}

const VehicleCardButton: React.FC<ButtonProps> = ({ vehicle, handleVehicleRetrieve }) => {
	const retrive = useRetriveVehicle()
	const garages = useGarages()
	const { isImpound } = useCurrentGarage()
	const setVehicleList = useSetVehicles()

	const garage = garages.find(g => g.name === vehicle.garage) || { label: vehicle.garage }

	return (
		<Group>
			{isImpound ? (
				<>
					<Text size='sm' c='dimmed'>{`$${vehicle.impound}`}</Text>
					{garage.label && (
						<Tooltip label={`Pay fine and send vehicle to ${garage.label}`}>
							<ButtonWrapper
								color='teal'
								onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
									e.stopPropagation()
									handleVehicleRetrieve(false)
								}}
								loaderProps={{ type: 'dots' }}
								loading={retrive === vehicle.plate}
								disabled={retrive !== ''}
								leftSection={<IconCoins size={18} />}
							>
								Pay
							</ButtonWrapper>
						</Tooltip>
					)}
					<Tooltip label='Pay fine and retrieve vehicle'>
						<ButtonWrapper
							color='green'
							onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
								e.stopPropagation()
								handleVehicleRetrieve(true)
							}}
							loaderProps={{ type: 'dots' }}
							loading={retrive === vehicle.plate}
							disabled={retrive !== ''}
							leftSection={<IconCar size={18} />}
						>
							Retrieve
						</ButtonWrapper>
					</Tooltip>
				</>
			) : (
				<ButtonWrapper
					onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
						e.stopPropagation()
						handleVehicleRetrieve(true)
					}}
					disabled={vehicle.state.value !== VehicleState.INSIDE || retrive !== ''}
					loaderProps={{ type: 'dots' }}
					loading={vehicle.state.value === VehicleState.INSIDE && retrive === vehicle.plate}
					leftSection={<IconCar size={18} />}
				>
					Retrieve
				</ButtonWrapper>
			)}
			{vehicle.unavailable && (
				<Menu shadow='md'>
					<Menu.Target>
						<ButtonWrapper
							color='orange'
							leftSection={<IconBackpack size={18} />}
							onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.stopPropagation()}
						>
							Refund Options
						</ButtonWrapper>
					</Menu.Target>

					<Menu.Dropdown>
						<Menu.Label>Refunds</Menu.Label>
						{vehicle.refunds.ves && (
							<Menu.Item
								onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
									e.stopPropagation()
									const result = await fetchNui('refundVes', { plate: vehicle.plate })
									if (result) {
										setVehicleList(prevVehicleList =>
											prevVehicleList.map(prevVehicle => {
												if (prevVehicle.plate === vehicle.plate) {
													return { ...prevVehicle, refunds: { ...prevVehicle.refunds, ves: false } }
												}
												return prevVehicle
											})
										)
									}
								}}
							>
								Remove Ves
							</Menu.Item>
						)}
						{vehicle.refunds.headlight && (
							<Menu.Item
								onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
									e.stopPropagation()
									const result = await fetchNui('refundHeadlight', { plate: vehicle.plate })
									if (result) {
										setVehicleList(prevVehicleList =>
											prevVehicleList.map(prevVehicle => {
												if (prevVehicle.plate === vehicle.plate) {
													return { ...prevVehicle, refunds: { ...prevVehicle.refunds, headlight: false } }
												}
												return prevVehicle
											})
										)
									}
								}}
							>
								Remove Headlight
							</Menu.Item>
						)}
						{vehicle.refunds.customPlate && (
							<Menu.Item
								onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
									e.stopPropagation()
									const newPlate = await fetchNui('refundCustomPlate', { plate: vehicle.plate })
									if (newPlate) {
										setVehicleList(prevVehicleList =>
											prevVehicleList.map(prevVehicle => {
												if (prevVehicle.plate === vehicle.plate) {
													return {
														...prevVehicle,
														plate: newPlate,
														refunds: { ...prevVehicle.refunds, customPlate: false },
													}
												}
												return prevVehicle
											})
										)
									}
								}}
							>
								Remove Plate
							</Menu.Item>
						)}
						<Menu.Divider />
						<Menu.Item
							onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
								e.stopPropagation()
								fetchNui('unavailableVehicleInventory', { plate: vehicle.plate })
							}}
						>
							Open Trunk and Glovebox
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			)}
		</Group>
	)
}

export default VehicleCardButton
