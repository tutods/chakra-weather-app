import { ReactNode } from 'react';
import { CountryType } from 'shared/@types/CountriesResponse';

type CountriesContextProps = {
	countries: CountryType[];
};

type CountriesContextProviderProps = {
	children: ReactNode;
};

export { CountriesContextProps, CountriesContextProviderProps };
