import { ConfigType } from 'shared/@types/Config';

const config: ConfigType = {
	countriesApi: {
		url: process.env.COUNTRIES_API || ''
	},

	weatherApi: {
		url: process.env.WEATHER_API_URL || '',
		key: process.env.WEATHER_API_KEY || ''
	}
};

export default config;
