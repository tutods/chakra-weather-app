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
	FormControl,
	FormLabel,
	Heading,
	Icon,
	IconButton,
	Select,
	useColorModeValue,
	useToast
} from '@chakra-ui/react';
import { CountriesContext } from 'contexts/CountriesContext';
import { WeatherContext } from 'contexts/WeatherContext';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { IoClose, IoSave } from 'react-icons/io5';
import { SavedCityType } from 'shared/@types/WeatherContext';

type Props = Omit<DrawerProps, 'children'>;

const AddCityDrawer = ({ isOpen, onClose, ...props }: Props) => {
	const { countries } = useContext(CountriesContext);
	const { addCity } = useContext(WeatherContext);
	const toast = useToast();

	const [data, setData] = useState<Omit<SavedCityType, 'coordinates'>>({
		country: '',
		name: ''
	});

	const handleInputChange = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = evt.target;

		// Avoid problems with second select when change the country
		if (name === 'country' && data.name !== '') {
			setData({
				name: '',
				[name]: value
			});
			return;
		}

		setData((prevState) => ({
			...prevState,
			[name]: value
		}));
	};

	// Handle submit the values
	const handleSubmit = (evt: FormEvent) => {
		evt.preventDefault();

		if (!data.country || !data.name) {
			toast({
				description: `Please fill the city and the country field`,
				status: 'error',
				isClosable: true
			});
			return;
		}

		try {
			addCity(data);

			toast({
				description: `City ${data.name} added successfully`,
				status: 'success',
				isClosable: true
			});

			onClose();

			setData({
				name: '',
				country: ''
			});
		} catch (error) {
			toast({
				description: `Occurred an error while adding the city. Please try again.`,
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
						Add City
					</Heading>
					<IconButton
						aria-label={'Close'}
						onClick={onClose}
						icon={
							<Icon
								as={IoClose}
								color={useColorModeValue('primary.500', 'secondary.500')}
							/>
						}
					/>
				</DrawerHeader>
				<DrawerBody as={Flex} flexDir={'column'} gap={4}>
					<form onSubmit={handleSubmit} id="add-form">
						<FormControl>
							<FormLabel htmlFor="country">Country</FormLabel>
							<Select
								onChange={handleInputChange}
								name={'country'}
								variant="filled"
								placeholder="Select a country"
							>
								{countries.map((country) => (
									<option key={country.iso2} value={country.iso2}>
										{country.country}
									</option>
								))}
							</Select>
						</FormControl>

						<FormControl>
							<FormLabel htmlFor="city">City</FormLabel>
							<Select
								disabled={!data.country}
								onChange={handleInputChange}
								name={'name'}
								variant="filled"
								placeholder="Select a city"
							>
								{countries.filter((country) => country.iso2 === data.country)
									.length > 0 &&
									countries
										.filter((country) => country.iso2 === data.country)[0]
										.cities.map((city) => (
											<option key={city} value={city}>
												{city}
											</option>
										))}
							</Select>
						</FormControl>
					</form>
				</DrawerBody>

				<DrawerFooter as={Flex} gap={2} alignItems={'center'} justifyContent={'flex-end'}>
					<Button
						type={'button'}
						variant="outline"
						onClick={onClose}
						leftIcon={<Icon as={IoClose} />}
					>
						Cancel
					</Button>
					<Button
						disabled={!data.country || !data.name}
						type={'submit'}
						form={'add-form'}
						F
						colorScheme={useColorModeValue('primary', 'secondary')}
						leftIcon={<Icon as={IoSave} />}
					>
						Save
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

export default AddCityDrawer;
