import {
	Button,
	Container,
	Flex,
	Heading,
	Icon,
	SimpleGrid,
	useDisclosure
} from '@chakra-ui/react';
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
		<Container as={'main'} maxW={'container.lg'}>
			<Flex
				as={'section'}
				gap={2}
				alignItems={'center'}
				justifyContent={'space-between'}
				my={4}
			>
				<Heading as={'h1'} fontSize={'4xl'} fontWeight={'bold'}>
					Tracked Cities
				</Heading>

				<Button
					onClick={onOpen}
					leftIcon={<Icon as={BsPlusLg} fontSize={'14px'} />}
					colorScheme={'primary'}
				>
					Add City
				</Button>

				<AddCityDrawer isOpen={isOpen} onClose={onClose} />
			</Flex>

			{cities.length > 0 && (
				<SimpleGrid columns={[1, 2, 3]} spacing={2}>
					{cities.map((city) => (
						<WeatherCard city={city} key={city.name} />
					))}
				</SimpleGrid>
			)}
		</Container>
	);
};

export default Home;
