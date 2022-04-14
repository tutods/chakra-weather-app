import { Box, Flex, Heading, Image, Text, Tooltip, useDisclosure } from '@chakra-ui/react';
import cardBackground from 'assets/media/backgrounds/mountain.jpg';
import { DailyWeatherType } from 'shared/@types/WeatherResponse';
import { getWeatherIcon } from 'shared/services/weather/service';
import { getByTimestamp, getTimestampWeekDay } from 'shared/utils/timestampUtils';
import { getInfoFromDaily } from 'shared/utils/transformWeather';

import WeatherInfoModal from '../../InfoModal';

type Props = {
	weather: DailyWeatherType;
};

const DailyCard = ({ weather, ...props }: Props) => {
	// Info Modal
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
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
				flex={['0 1 50%', '0 1 33.33%', '0 1 25%']}
				onClick={onOpen}
				{...props}
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
					<Heading as={'h4'} fontSize={'xs'} fontWeight={'bold'}>
						{getTimestampWeekDay(weather?.dt)}
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

					<Flex
						justifyContent={'center'}
						alignItems={'center'}
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
							<Tooltip hasArrow label={'Current Temperature'} placement={'top'}>
								<Text fontWeight={500}>{Math.round(weather?.temp.day)} ºC</Text>
							</Tooltip>
						</Box>
						<Box>
							<Tooltip hasArrow label={'Minimum Temperature'} placement={'top'}>
								<Text color={'gray.300'}>
									{Math.round(weather?.temp.min)} <small>ºC</small>
								</Text>
							</Tooltip>
						</Box>
					</Flex>
				</Box>
			</Box>

			<WeatherInfoModal
				weather={getInfoFromDaily(weather)}
				isOpen={isOpen}
				onClose={onClose}
			/>
		</>
	);
};

export default DailyCard;
