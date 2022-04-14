import { ReactNode } from 'react';

type WeatherContextProps = {
	cities: SavedCityType[];

	addCity: (city: Omit<SavedCityType, 'coordinates'>) => Promise<void>;
	removeCity: (city: SavedCityType) => void;
};

type WeatherContextProviderProps = {
	children: ReactNode;
};

type SavedCityType = {
	name: string;
	country: string;
	coordinates: {
		lat: number;
		long: number;
	};
};

export { SavedCityType, WeatherContextProps, WeatherContextProviderProps };
