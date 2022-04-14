import { createContext, useEffect, useState } from 'react';
import {
	CountriesContextProps,
	CountriesContextProviderProps
} from 'shared/@types/CountriesContext';
import { CountryType } from 'shared/@types/CountriesResponse';
import { getCountries } from 'shared/services/country/service';

const CountriesContext = createContext({} as CountriesContextProps);

const CountriesContextProvider = ({ children }: CountriesContextProviderProps) => {
	const [countries, setCountries] = useState<CountryType[]>([]);

	const getCountriesList = async () => {
		try {
			const { data } = await getCountries();

			console.log('WHERE', data);
			/**
			 * Remove countries with same ISO2 code
			 *
			 * unique: array of countries (using the .some to validate if any object on array
			 * haves that ISO2 code)
			 * currentCountry: current country object present on original array
			 * []: initial value of reducer
			 */
			const result = data.reduce((unique: CountryType[], currentCountry: CountryType) => {
				if (!unique.some((country: CountryType) => country.iso2 === currentCountry.iso2)) {
					unique.push(currentCountry);
				}
				return unique;
			}, []);

			setCountries(result);

			// Save into local storage
			localStorage.setItem('countries', JSON.stringify(result));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (localStorage.getItem('countries')) {
			const savedCountries = localStorage.getItem('countries');

			setCountries(JSON.parse(savedCountries!));
		} else {
			getCountriesList();
		}
	}, []);

	return <CountriesContext.Provider value={{ countries }}>{children}</CountriesContext.Provider>;
};

export { CountriesContext, CountriesContextProvider };
