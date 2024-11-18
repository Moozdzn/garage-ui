import { VehicleState } from '../enum/state'
import { VehicleKey, VehicleMod, VehicleStat, VehicleUpgrade } from '../typings/vehicle'

const Tunes = [1, 2, 3, ' Drift']

const Sounds = ['Stock', 'Vroom', 'Vroom Vroom', 'Vroom Vroom Vroom']

const Headlights = ['No', 'Yes', 'Rainbow']

const Upgrades = ['Stock', 1, 2, 3, 4, 5, 6]

const VehicleNames = [
	'Abarth',
	'Alfa Romeo',
	'Aston Martin',
	'Audi',
	'Bentley',
	'BMW',
	'Bugatti',
	'Cadillac',
	'Chevrolet',
	'Chrysler',
	'Citroën',
	'Dacia',
	'Daewoo',
	'Daihatsu',
	'Dodge',
	'Donkervoort',
	'DS',
	'Ferrari',
	'Fiat',
	'Fisker',
	'Ford',
	'Honda',
	'Hummer',
	'Hyundai',
	'Infiniti',
	'Iveco',
	'Jaguar',
	'Jeep',
	'Kia',
	'KTM',
	'Lada',
	'Lamborghini',
	'Lancia',
	'Land Rover',
	'Landwind',
	'Lexus',
	'Lotus',
	'Maserati',
	'Maybach',
	'Mazda',
	'McLaren',
	'Mercedes-Benz',
	'MG',
	'Mini',
	'Mitsubishi',
	'Morgan',
	'Nissan',
	'Opel',
	'Peugeot',
	'Porsche',
	'Renault',
	'Rolls-Royce',
	'Rover',
	'Saab',
	'Seat',
	'Skoda',
	'Smart',
	'SsangYong',
	'Subaru',
	'Suzuki',
	'Tesla',
	'Toyota',
	'Volkswagen',
	'Volvo',
]

export const generateVehicleDetails = (): {
	modifications: VehicleMod[]
	stats: VehicleStat[]
	upgrades: VehicleUpgrade[]
	keys: VehicleKey[]
} => {
	const tune = Tunes[Math.floor(Math.random() * Tunes.length)]
	const sound = Sounds[Math.floor(Math.random() * Sounds.length)]
	const headlight = Headlights[Math.floor(Math.random() * Headlights.length)]

	return {
		modifications: [
			{ label: 'Tune', value: tune },
			{ label: 'Sound', value: sound },
			{ label: 'Headlight', value: headlight },
		],
		stats: [
			{ label: 'Fuel', value: Math.floor(Math.random() * 100) },
			{ label: 'Engine', value: Math.floor(Math.random() * 100) },
			{ label: 'Body', value: Math.floor(Math.random() * 100) },
		],
		upgrades: [
			{ label: 'Engine', value: Upgrades[Math.floor(Math.random() * Upgrades.length)] as string },
			{ label: 'Transmission', value: Upgrades[Math.floor(Math.random() * Upgrades.length)] as string },
			{ label: 'Suspension', value: Upgrades[Math.floor(Math.random() * Upgrades.length)] as string },
			{ label: 'Brakes', value: Upgrades[Math.floor(Math.random() * Upgrades.length)] as string },
			{ label: 'Turbo', value: Upgrades[Math.floor(Math.random() * Upgrades.length)] as string },
			{ label: 'Armor', value: Upgrades[Math.floor(Math.random() * Upgrades.length)] as string },
		],
		keys: [
			{ label: 'John Cena', value: Math.floor(Math.random() * 1000000).toString() },
			{ label: 'John Cena 1', value: Math.floor(Math.random() * 1000000).toString() },
			{ label: 'John Cena 2', value: Math.floor(Math.random() * 1000000).toString() },
			{ label: 'John Cena 3', value: Math.floor(Math.random() * 1000000).toString() },
			{ label: 'John Cena 4', value: Math.floor(Math.random() * 1000000).toString() },
		],
	}
}

const generatePlate = () => {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	const numbers = '0123456789'
	const plate =
		characters
			.split('')
			.sort(() => Math.random() - Math.random())
			.slice(0, 4)
			.join('') +
		numbers
			.split('')
			.sort(() => Math.random() - Math.random())
			.slice(0, 4)
			.join('')
	return plate
}

export const generateVehicle = (garage: string) => {
	const states = Object.values(VehicleState)
	const randomState = states[Math.floor(Math.random() * states.length)]

	return {
		label: VehicleNames[Math.floor(Math.random() * VehicleNames.length)] + ' ' + Math.floor(Math.random() * 1000),
		citizenid: 'AMN20902',
		plate: generatePlate(),
		impound: Math.floor(Math.random() * 9999),
		state: { label: 'Outside | Impounded', value: randomState },
		unavailable: Math.random() < 0.5,
		refunds: {
			ves: Math.random() < 0.5,
			headlight: Math.random() < 0.5,
			customPlate: Math.random() < 0.5
		},
		fetched: false,
		stats: [],
		modifications: [],
		upgrades: [],
		keys: [],
		garage,
	}
}

export const generateVehicles = (count: number, garage: string) => {
	const vehicles = []
	for (let i = 0; i < count; i++) {
		vehicles.push(generateVehicle(garage))
	}
	return vehicles
}
