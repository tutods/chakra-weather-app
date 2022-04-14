import { CitiesResponseType, CountriesResponseType } from 'shared/@types/CountriesResponse';
import countryApi from 'shared/services/country/index';

const getCountryCities = async (country: string): Promise<CitiesResponseType> => {
	try {
		const { data } = await countryApi.post<CitiesResponseType>('countries/cities', {
			country
		});
		return data;
	} catch (error: any) {
		return Promise.reject(error);
	}
};

const getCountries = async (): Promise<CountriesResponseType> => {
	try {
		const { data } = await countryApi.get<CountriesResponseType>('countries');

		return data;
	} catch (error: any) {
		return Promise.reject(error);
	}
};

export { getCountries, getCountryCities };
