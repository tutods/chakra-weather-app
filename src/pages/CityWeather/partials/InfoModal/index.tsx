import {
	Box,
	Flex,
	Heading,
	Image,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	ModalProps,
	SimpleGrid,
	Text,
	Tooltip,
	useColorModeValue
} from '@chakra-ui/react';
import cardBackground from 'assets/media/backgrounds/mountain.jpg';
import CloudsIcon from 'components/icons/CloudsIcon';
import RainIcon from 'components/icons/Rainicon';
import WindIcon from 'components/icons/WindIcon';
import { AdditionalWeatherType } from 'shared/@types/AdditionalWeather';
import { getWeatherIcon } from 'shared/services/weather/service';
import capitalizeString from 'shared/utils/capitalizeString';
import { getByTimestamp, getTimestampWeekDay } from 'shared/utils/timestampUtils';

type Props = Omit<ModalProps, 'children'> & {
	weather: AdditionalWeatherType;
};

const WeatherInfoModal = ({ weather, isOpen, onClose, ...props }: Props) => {
	return (
		<Modal size={'2xl'} isOpen={isOpen} onClose={onClose} {...props}>
			<ModalOverlay />

			<ModalContent>
				<ModalHeader fontWeight={300}>
					Weather Info from <strong>{getByTimestamp(weather.dt, 'MMMM dd')}th</strong>
				</ModalHeader>
				<ModalCloseButton />

				<ModalBody py={4}>
					<SimpleGrid spacing={4} columns={[1, 2]}>
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
									{getTimestampWeekDay(weather.dt)}
								</Heading>
								<Text>{getByTimestamp(weather.dt)}</Text>

								{weather.weather[0] && (
									<Tooltip
										hasArrow
										label={weather.weather[0].main}
										placement={'top'}
									>
										<Image
											width={'80px'}
											filter={'drop-shadow(0 0 4px white)'}
											src={getWeatherIcon(weather?.weather[0].icon)}
											alt={weather?.weather[0].description}
										/>
									</Tooltip>
								)}

								{weather?.weather[0] && (
									<Text fontSize={'md'}>
										{capitalizeString(weather?.weather[0].description)}
									</Text>
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
										<Text fontSize={'sm'}>Temperature</Text>
										<Text fontWeight={'bold'}>
											{Math.round(weather.temp)} ºC
										</Text>
									</Box>
									<Box>
										<Text fontSize={'sm'}>Feels Like</Text>
										<Text fontWeight={'bold'}>
											{Math.round(weather.feels_like)} ºC
										</Text>
									</Box>
									<Box>
										<Text fontSize={'sm'}>Humidity</Text>
										<Text fontWeight={'bold'}>
											{Math.round(weather.humidity)}%
										</Text>
									</Box>
								</Flex>
							</Box>
						</Box>

						<Box>
							<Flex gap={2} alignItems={'center'} pt={2}>
								<WindIcon
									fontSize={'4rem'}
									color={useColorModeValue('primary.500', 'secondary.500')}
									fill={useColorModeValue('primary.500', 'secondary.500')}
								/>

								<Box>
									<Text fontSize={'xl'}>Wind</Text>
									<Text fontWeight={300} color={'grey.600'}>
										<strong>Velocity:</strong> {Math.round(weather.wind_speed)}{' '}
										km/h
									</Text>
									<Text fontWeight={300} color={'grey.600'}>
										<strong>Direction:</strong> {Math.round(weather.wind_deg)}º
									</Text>
								</Box>
							</Flex>

							<Flex gap={2} alignItems={'center'} pt={2}>
								<RainIcon
									fontSize={'4rem'}
									color={useColorModeValue('primary.500', 'secondary.500')}
									fill={useColorModeValue('primary.500', 'secondary.500')}
								/>

								<Box>
									<Text fontSize={'xl'}>Rain</Text>
									<Text fontWeight={300} color={'grey.600'}>
										<strong>Percentage:</strong> {weather.rain} %
									</Text>
								</Box>
							</Flex>

							<Flex gap={2} alignItems={'center'} pt={2}>
								<CloudsIcon
									fontSize={'4rem'}
									color={useColorModeValue('primary.500', 'secondary.500')}
									fill={useColorModeValue('primary.500', 'secondary.500')}
								/>

								<Box>
									<Text fontSize={'xl'}>Clouds</Text>
									<Text fontWeight={300} color={'grey.600'}>
										<strong>Percentage:</strong> {weather.clouds} %
									</Text>
								</Box>
							</Flex>
						</Box>
					</SimpleGrid>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default WeatherInfoModal;
