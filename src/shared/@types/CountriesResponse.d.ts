// Endpoint Example: https://countriesnow.space/api/v0.1/countries
type CountriesResponseType = {
	error: boolean;
	msg: string;
	data: {
		iso2: string;
		iso3: string;
		country: string;
		cities: string[];
	}[];
};

type CountryType = {
	iso2: string;
	iso3: string;
	country: string;
	cities: string[];
};

// Endpoint Example (POST): https://countriesnow.space/api/v0.1/countries/cities ("country": "nigeria")
type CitiesResponseType = {
	error: boolean;
	msg: string;
	data: string[];
};

export { CitiesResponseType, CountriesResponseType, CountryType };
