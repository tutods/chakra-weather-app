import 'swiper/css';
import 'swiper/css/navigation';

import {
	Box,
	Container,
	Flex,
	Grid,
	GridItem,
	Heading,
	Text,
	useColorMode,
	useToast
} from '@chakra-ui/react';
import sunnyBackground from 'assets/media/backgrounds/sunny.jpg';
import Loading from 'components/Loading';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SavedCityType } from 'shared/@types/WeatherContext';
import { CityResponseType, OneCityCallResponseType } from 'shared/@types/WeatherResponse';
import { getCityCoordinates, getOneCallCityWeather } from 'shared/services/weather/service';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import DailyCard from './partials/cards/Daily';
import MainWeatherCard from './partials/cards/Main';

const CityWeather = () => {
	// Route Params
	let { country, city } = useParams();

	const toast = useToast();
	const { colorMode } = useColorMode();

	// States
	const [currentCity, setCurrentCity] = useState<SavedCityType>();
	const [weather, setWeather] = useState<OneCityCallResponseType>();

	// Loading State
	const [isLoading, setIsLoading] = useState(true);

	// Change slides per view with screen size
	const [slidesPerView, setSlidesPerView] = useState<number | 'auto'>(4);

	useEffect(() => {
		// Change slides per view with screen size
		const handleScreenResize = () => {
			if (window.innerWidth < 768) {
				setSlidesPerView(1);
			} else if (window.innerWidth < 1024) {
				setSlidesPerView(3);
			} else {
				setSlidesPerView(4);
			}
		};

		window.addEventListener('resize', handleScreenResize);
		handleScreenResize();

		return () => window.removeEventListener('resize', handleScreenResize);
	}, []);

	// Use Effect to get city info
	useEffect(() => {
		// Filter cities
		const getCityInfo = async () => {
			setIsLoading(true);

			try {
				const cityInfo: CityResponseType = await getCityCoordinates(city!, country!);

				const { name, local_names, lat, lon, country: localCountry } = cityInfo[0];

				// Save info on current city
				setCurrentCity({
					name: name || local_names.en,
					country: localCountry,
					coordinates: {
						lat: lat,
						long: lon
					}
				});
			} catch (error) {
				toast({
					description: "Couldn't get weather data! Please try again!",
					status: 'error',
					isClosable: true
				});
			}

			setIsLoading(false);
		};

		getCityInfo();

		return () => setCurrentCity(undefined);
	}, []);

	// Use Effect to get weather data
	useEffect(() => {
		// Get data from API
		const getWeatherData = async () => {
			// If you want not allow get weather to cities without tracking, remove the comments on else if
			if (!currentCity) {
				return;
			}
			// else if (
			// 	cities.filter(
			// 		(savedCity) =>
			// 			savedCity.name.includes(currentCity.name) &&
			// 			savedCity.country === currentCity.country
			// 	).length === 0
			// ) {
			// toast({
			// 	description: "You don't have this city on your tracking list!",
			// 	status: 'error',
			// 	isClosable: true
			// });
			// 	navigate('/');

			// 	return;
			// }

			setIsLoading(true);

			try {
				const data = await getOneCallCityWeather(
					currentCity?.coordinates.lat,
					currentCity?.coordinates.long
				);

				setWeather(data);
			} catch (error) {
				toast({
					description: "Couldn't get weather data! Please try again!"
				});
			}

			setIsLoading(false);
		};

		getWeatherData();

		return () => setWeather(undefined);
	}, [currentCity]);

	return (
		<>
			<Box
				paddingY={6}
				backgroundImage={sunnyBackground}
				backgroundPosition={'center'}
				backgroundSize={'cover'}
				backgroundColor={'blackAlpha.700'}
				backgroundBlendMode={'overlay'}
				as={Flex}
				flexDir={'column'}
				justifyContent={'center'}
				height={'400px'}
			>
				<Container maxW={'container.lg'}>
					{currentCity && weather ? (
						<>
							<Heading as={'h1'} fontWeight={'bold'} fontSize={'4xl'} color={'white'}>
								{currentCity?.name}
							</Heading>
							<Heading as={'h2'} fontWeight={400} fontSize={'2xl'} color={'white'}>
								Weather for the next <strong>7 days</strong>
							</Heading>
						</>
					) : (
						<>
							<Heading
								as={'h1'}
								fontWeight={'bold'}
								fontSize={'4xl'}
								color={'white'}
								textTransform={'capitalize'}
							>
								{city}
							</Heading>
							<Heading as={'h2'} fontWeight={400} fontSize={'2xl'} color={'white'}>
								We can&apos;t show the weather for this city!
							</Heading>
						</>
					)}
				</Container>
			</Box>
			<Container maxW={'container.lg'} py={6}>
				<Flex flexDir={'column'} gap={2}>
					{isLoading && <Loading />}

					{!isLoading && currentCity && weather && (
						<Grid templateColumns={['2fr', '2fr', '4fr 8fr']} gap={4}>
							<GridItem zIndex={5}>
								<MainWeatherCard city={currentCity} weather={weather!.current} />
							</GridItem>
							<GridItem overflow={'hidden'} maxWidth={'100%'}>
								<Swiper
									slidesPerView={slidesPerView}
									spaceBetween={20}
									grabCursor
									navigation
									modules={[Navigation]}
								>
									{weather.daily.slice(1, 8).map((daily) => (
										<SwiperSlide key={daily.dt}>
											<DailyCard weather={daily} />
										</SwiperSlide>
									))}
								</Swiper>

								<Text
									mt={2}
									fontSize={'lg'}
									color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}
								>
									<strong>Note:</strong> for further details of a specific day,
									click on the card.
								</Text>
							</GridItem>
						</Grid>
					)}
				</Flex>
			</Container>
		</>
	);
};

export default CityWeather;
