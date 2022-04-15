import {
	Button,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerProps,
	Flex,
	Heading,
	Icon,
	IconButton,
	useColorModeValue,
	useToast
} from '@chakra-ui/react';
import { WeatherContext } from 'contexts/WeatherContext';
import { useContext } from 'react';
import { IoClose, IoTrash } from 'react-icons/io5';
import { SavedCityType } from 'shared/@types/WeatherContext';

type Props = Omit<DrawerProps, 'children'> & {
	city: SavedCityType;
};

const RemoveCityDrawer = ({ isOpen, onClose, city, ...props }: Props) => {
	const { removeCity } = useContext(WeatherContext);
	const toast = useToast();

	// Handle submit
	const handleSubmit = () => {
		if (!city) {
			toast({
				description: `Please fill the city and the country field`,
				status: 'error',
				isClosable: true
			});
			return;
		}

		try {
			removeCity(city);

			onClose();
		} catch (error) {
			toast({
				description: `Occurred an error while removing the city. Please try again.`,
				status: 'error',
				isClosable: true
			});
		}
	};

	return (
		<Drawer isOpen={isOpen} placement={'right'} onClose={onClose} {...props} size={'md'}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerHeader as={Flex} alignItems={'center'} justifyContent={'space-between'}>
					<Heading as={'h3'} fontSize={'md'} fontWeight={'bold'}>
						Remove {city.name} City
					</Heading>
					<IconButton
						aria-label="Close"
						onClick={onClose}
						icon={
							<Icon
								as={IoClose}
								color={useColorModeValue('primary.500', 'secondary.500')}
							/>
						}
					/>
				</DrawerHeader>

				<DrawerBody
					as={Flex}
					flexDir={'column'}
					gap={4}
					justifyContent={'center'}
					textAlign={'center'}
				>
					<Heading as={'h4'} fontSize={'2xl'} fontWeight={300} textAlign={'center'}>
						You have sure you want to remove <strong>{city.name}</strong>?
					</Heading>
				</DrawerBody>

				<DrawerFooter as={Flex} gap={2} alignItems={'center'} justifyContent={'flex-end'}>
					<Button variant="outline" onClick={onClose} leftIcon={<Icon as={IoClose} />}>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit}
						colorScheme={'secondary'}
						leftIcon={<Icon as={IoTrash} />}
					>
						Remove
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

export default RemoveCityDrawer;
