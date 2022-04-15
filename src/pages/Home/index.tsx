import {
	Box,
	Button,
	Container,
	Flex,
	Heading,
	Icon,
	SimpleGrid,
	useDisclosure
} from '@chakra-ui/react';
import sunnyBackground from 'assets/media/backgrounds/sunny.jpg';
import WeatherCard from 'components/cards/Weather';
import AddCityDrawer from 'components/drawers/AddCity';
import { WeatherContext } from 'contexts/WeatherContext';
import { useContext } from 'react';
import { BsPlusLg } from 'react-icons/bs';

const Home = () => {
	const { cities } = useContext(WeatherContext);

	// Chakra UI Drawer Handle (to Add City Drawer)
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<main>
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
					<Heading as={'h1'} fontWeight={'bold'} fontSize={'4xl'} color={'white'}>
						Tracked Cities
					</Heading>
					<Heading as={'h2'} fontWeight={400} fontSize={'2xl'} color={'white'}>
						All the cities you are saved to see the weather!
					</Heading>

					<Button
						onClick={onOpen}
						leftIcon={<Icon as={BsPlusLg} fontSize={'14px'} />}
						mt={10}
						colorScheme={'secondary'}
					>
						Add City
					</Button>

					<AddCityDrawer isOpen={isOpen} onClose={onClose} />
				</Container>
			</Box>
			<Container as={'section'} maxW={'container.lg'} py={10}>
				{cities.length > 0 ? (
					<SimpleGrid columns={[1, 2, 3]} spacing={2}>
						{cities.map((city) => (
							<WeatherCard city={city} key={city.name} />
						))}
					</SimpleGrid>
				) : (
					<Heading as={'h3'} fontSize={'xl'} textAlign={'center'} fontWeight={'regular'}>
						Please add at least one city to track!
					</Heading>
				)}
			</Container>
		</main>
	);
};

export default Home;
