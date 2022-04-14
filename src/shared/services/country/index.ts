import axios from 'axios';
import config from 'shared/config';

const countryApi = axios.create({
	baseURL: config.countriesApi.url
});

export default countryApi;
