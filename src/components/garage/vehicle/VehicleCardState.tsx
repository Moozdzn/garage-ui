import { useCurrentGarage, useGarages, useViewingGarage } from "../../../state"
import type { Vehicle } from "../../../typings/vehicle"
import { VehicleStateColor } from "../../../enum/state"
import { BadgeWrapper } from "../../ButtonWrapper"

interface Props {
    vehicle: Vehicle
}

const VehicleCardState: React.FC<Props> = ({ vehicle }) => {
	const { isImpound } = useCurrentGarage()
    const { isCurrent } = useViewingGarage()
	const garages = useGarages()
	const garage = garages.find(g => g.name === vehicle.garage) || { label: vehicle.garage }

    if (isCurrent && isImpound) {
        return (
            <BadgeWrapper color='yellow'>
                {garage.label || "VIP Parking"}
            </BadgeWrapper>
        )
    }

    return <BadgeWrapper color={VehicleStateColor[vehicle.state.value as keyof typeof VehicleStateColor]}>
    {vehicle.state.label}
</BadgeWrapper>

}

export default VehicleCardState