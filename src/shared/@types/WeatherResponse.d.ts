// Endpoint Example: http://api.openweathermap.org/geo/1.0/direct?q=porto,pt&limit=1&appid=<key>
type CityResponseType = {
	name: string;
	local_names: {
		kn: string;
		ascii: string;
		feature_name: string;
		ar: string;
		el: string;
		ru: string;
		lt: string;
		pt: string;
		hu: string;
		sr: string;
		uk: string;
		es: string;
		en: string;
	};
	lat: number;
	lon: number;
	country: string;
}[];

// Endpoint Example: http://api.openweathermap.org/data/2.5/weather?lat=39.74362&lon=-8.80705&units=metric&appid=<key>
type WeatherResponseType = {
	coord: {
		lon: number;
		lat: number;
	};
	weather: {
		id: number;
		main: string;
		description: string;
		icon: string;
	}[];
	base: string;
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		humidity: number;
	};
	visibility: number;
	wind: {
		speed: number;
		deg: number;
	};
	clouds: {
		all: number;
	};
	dt: number;
	sys: {
		type: number;
		id: number;
		country: string;
		sunrise: number;
		sunset: number;
	};
	timezone: number;
	id: number;
	name: string;
	cod: number;
};

type CurrentWeatherType = {
	dt: number;
	sunrise: number;
	sunset: number;
	temp: number;
	feels_like: number;
	pressure: number;
	humidity: number;
	dew_point: number;
	uvi: number;
	clouds: number;
	visibility: number;
	wind_speed: number;
	wind_deg: number;
	weather: {
		id: number;
		main: string;
		description: string;
		icon: string;
	}[];
	rain?: {
		'1h'?: number;
		'3h'?: number;
	};
};

type DailyWeatherType = {
	dt: number;
	sunrise: number;
	sunset: number;
	moonrise: number;
	moonset: number;
	moon_phase: number;
	temp: {
		day: number;
		min: number;
		max: number;
		night: number;
		eve: number;
		morn: number;
	};
	feels_like: {
		day: number;
		night: number;
		eve: number;
		morn: number;
	};
	pressure: number;
	humidity: number;
	dew_point: number;
	wind_speed: number;
	wind_deg: number;
	wind_gust: number;
	weather: {
		id: number;
		main: string;
		description: string;
		icon: string;
	}[];
	clouds: number;
	pop: number;
	rain: number;
	uvi: number;
};

// https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=minutely,hourly&units=metric&appid=<key>
type OneCityCallResponseType = {
	lat: number;
	lon: number;
	timezone: string;
	timezone_offset: number;
	current: CurrentWeatherType;
	daily: DailyWeatherType[];
};

export {
	CityResponseType,
	CurrentWeatherType,
	DailyWeatherType,
	OneCityCallResponseType,
	WeatherResponseType
};
