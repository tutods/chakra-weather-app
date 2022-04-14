type AdditionalWeatherType = {
	dt: number;
	sunrise: number;
	sunset: number;
	temp: number;
	min_temp?: number;
	max_temp?: number;
	feels_like: number;
	pressure: number;
	humidity: number;
	dew_point: number;
	uvi: number;
	clouds: number;
	visibility?: number;
	wind_speed: number;
	wind_deg: number;
	rain?: number;
	weather: {
		id: number;
		main: string;
		description: string;
		icon: string;
	}[];
};

export { AdditionalWeatherType };
