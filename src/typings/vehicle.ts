import type { VehicleState } from "../enum/state";

export interface VehicleMod {
    label: string;
    value: number | string | number[];
}

export interface VehicleStat {
    label: string;
    value: number;
}

export interface VehicleUpgrade {
    label: string;
    value: string;
}

export interface VehicleKey {
    label: string;
    value: string;
}
type ValueOf<T> = T[keyof T];

export interface Vehicle {
    citizenid: string;
    label: string;
    plate: string;
    impound: number;
    modifications: VehicleMod[];
    state: {
        label: string;
        value: ValueOf<typeof VehicleState>;
    };
    stats: VehicleStat[];
    upgrades: VehicleUpgrade[];
    keys: VehicleKey[];
    fetched: boolean;
    garage: string;
    unavailable: boolean;
    refunds: {
        ves: boolean;
        headlight: boolean;
        customPlate: boolean
    }
}