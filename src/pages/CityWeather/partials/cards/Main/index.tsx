import { Box, Flex, Heading, Image, Text, Tooltip, useDisclosure } from '@chakra-ui/react';
import cardBackground from 'assets/media/backgrounds/mountain.jpg';
import { SavedCityType } from 'shared/@types/WeatherContext';
import { CurrentWeatherType } from 'shared/@types/WeatherResponse';
import { getWeatherIcon } from 'shared/services/weather/service';
import capitalizeString from 'shared/utils/capitalizeString';
import { getByTimestamp, getTimestampWeekDay } from 'shared/utils/timestampUtils';
import { getInfoFromCurrent } from 'shared/utils/transformWeather';

import WeatherInfoModal from '../../InfoModal';

type Props = {
	city: SavedCityType;
	weather: CurrentWeatherType;
};

const MainWeatherCard = ({ city, weather }: Props) => {
	// Info Modal
	const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();

	return (
		<Box
			backgroundImage={`${cardBackground}`}
			backgroundPosition={'center'}
			backgroundRepeat={'no-repeat'}
			backgroundSize={'cover'}
			backgroundColor={'blackAlpha.600'}
			backgroundBlendMode={'overlay'}
			transition={'all 0.3s ease-in-out'}
			_hover={{
				backgroundColor: 'blackAlpha.700'
			}}
			borderRadius={'10px'}
			color={'white'}
			boxShadow={'lg'}
			cursor={'pointer'}
			onClick={onModalOpen}
		>
			<Box
				position={'relative'}
				as={Flex}
				alignItems={'center'}
				justifyContent={'center'}
				flexDir={'column'}
				paddingX={4}
				paddingY={6}
				color={'white'}
				textAlign={'center'}
			>
				<WeatherInfoModal
					weather={getInfoFromCurrent(weather)}
					isOpen={isModalOpen}
					onClose={onModalClose}
				/>

				<Heading as={'h4'} fontSize={'xs'} fontWeight={'bold'}>
					{getTimestampWeekDay(weather.dt)}
				</Heading>
				<Text>{getByTimestamp(weather.dt)}</Text>

				{weather.weather[0] && (
					<Tooltip hasArrow label={weather.weather[0].main} placement={'top'}>
						<Image
							width={'80px'}
							filter={'drop-shadow(0 0 4px white)'}
							src={getWeatherIcon(weather?.weather[0].icon)}
							alt={weather?.weather[0].description}
						/>
					</Tooltip>
				)}

				<Heading fontSize={'lg'}>
					{city.name} {''}
					<Text
						as={'sup'}
						fontSize={'xs'}
						fontWeight={'bold'}
						backgroundColor={'secondary.500'}
						color={'white'}
						px={2}
						borderRadius={10}
					>
						{city.country}
					</Text>
				</Heading>

				{weather?.weather[0] && (
					<Text fontSize={'md'}>{capitalizeString(weather?.weather[0].description)}</Text>
				)}

				<Flex
					justifyContent={'center'}
					flexWrap={'wrap'}
					gap={[0, 0, 2]}
					padding={2}
					w={'100%'}
					marginTop={4}
					borderRadius={'10px'}
					backgroundColor={'whiteAlpha.500'}
					sx={{
						'& *': {
							textAlign: 'center',
							flex: ['0 1 50%', '0 1 50%', 'auto']
						}
					}}
				>
					<Box>
						<Text fontSize={'sm'}>Current Temp.</Text>
						<Text fontWeight={'bold'}>{Math.round(weather.temp)} ºC</Text>
					</Box>
					<Box>
						<Text fontSize={'sm'}>Feels Like</Text>
						<Text fontWeight={'bold'}>{Math.round(weather?.feels_like)} ºC</Text>
					</Box>
					<Box>
						<Text fontSize={'sm'}>Humidity</Text>
						<Text fontWeight={'bold'}>{Math.round(weather.humidity)}%</Text>
					</Box>
				</Flex>
			</Box>
		</Box>
	);
};

export default MainWeatherCard;
