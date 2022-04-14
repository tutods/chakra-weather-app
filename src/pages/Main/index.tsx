import Header from 'components/navigation/Header';
import { CountriesContextProvider } from 'contexts/CountriesContext';
import { WeatherContextProvider } from 'contexts/WeatherContext';
import CityWeather from 'pages/CityWeather';
import Home from 'pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Main = () => {
	return (
		<BrowserRouter>
			<Header />
			<WeatherContextProvider>
				<Routes>
					<Route
						index
						element={
							<CountriesContextProvider>
								<Home />
							</CountriesContextProvider>
						}
					/>

					<Route path={'/:country/:city'} element={<CityWeather />} />
				</Routes>
			</WeatherContextProvider>
		</BrowserRouter>
	);
};

export default Main;
