import {
	CityResponseType,
	OneCityCallResponseType,
	WeatherResponseType
} from 'shared/@types/WeatherResponse';
import weatherApi from 'shared/services/weather/index';

const getCityWeather = async (lat: number, long: number): Promise<WeatherResponseType> => {
	try {
		const { data } = await weatherApi.get<WeatherResponseType>('data/2.5/weather', {
			params: {
				lat,
				lon: long,
				units: 'metric'
			}
		});

		return data;
	} catch (error: any) {
		return Promise.reject(error);
	}
};

const getOneCallCityWeather = async (
	lat: number,
	long: number
): Promise<OneCityCallResponseType> => {
	try {
		const { data } = await weatherApi.get<OneCityCallResponseType>('data/2.5/onecall', {
			params: {
				lat,
				lon: long,
				units: 'metric',
				exclude: ['minutely', 'hourly'].join(',')
			}
		});

		return data;
	} catch (error: any) {
		return Promise.reject(error);
	}
};

const getCityCoordinates = async (city: string, country: string): Promise<CityResponseType> => {
	try {
		const { data } = await weatherApi.get<CityResponseType>('/geo/1.0/direct', {
			params: {
				q: `${city},${country}`,
				limit: 1
			}
		});

		return data;
	} catch (error: any) {
		return Promise.reject(error);
	}
};

const getWeatherIcon = (icon: string) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

export { getCityCoordinates, getCityWeather, getOneCallCityWeather, getWeatherIcon };
