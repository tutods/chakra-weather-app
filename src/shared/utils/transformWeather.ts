import { AdditionalWeatherType } from 'shared/@types/AdditionalWeather';
import { CurrentWeatherType, DailyWeatherType } from 'shared/@types/WeatherResponse';

type RainType = {
	'1h'?: number;
	'3h'?: number;
};

const getRain = (rain: RainType | number) => {
	return typeof rain === 'number' ? rain : rain['1h'] ? rain['1h'] : rain['3h'];
};

const getInfoFromCurrent = (weather: CurrentWeatherType): AdditionalWeatherType => {
	const { rain } = weather;

	return {
		...weather,
		rain: rain ? getRain(rain) : 0
	};
};

const getInfoFromDaily = (weather: DailyWeatherType) => {
	const { temp, feels_like, rain } = weather;

	return {
		...weather,
		temp: temp.day,
		max_temp: temp.max,
		min_temp: temp.min,
		feels_like: feels_like.day,
		rain: rain ? getRain(rain) : 0
	};
};

export { getInfoFromCurrent, getInfoFromDaily };
