export const VehicleState = {
    OUT: 0,
    INSIDE: 1,
    CONFISCATED: 2
} as const

export const VehicleStateColor = {
    [VehicleState.OUT]: "yellow",
    [VehicleState.INSIDE]: "blue",
    [VehicleState.CONFISCATED]: "red"
} as const