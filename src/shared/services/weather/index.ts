import axios from 'axios';
import config from 'shared/config';

const weatherApi = axios.create({
	baseURL: config.weatherApi.url,
	params: {
		appid: config.weatherApi.key
	}
});

export default weatherApi;
