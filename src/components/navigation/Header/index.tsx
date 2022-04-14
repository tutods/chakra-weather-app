import {
	Box,
	Container,
	Flex,
	Heading,
	Icon,
	IconButton,
	useColorModeValue,
	useDisclosure
} from '@chakra-ui/react';
import { BiMenuAltRight, BiX } from 'react-icons/bi';

import DrawerMenu from '../DrawerMenu';

const Header = () => {
	// Mobile Drawer
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box
			boxShadow={'md'}
			backgroundColor={useColorModeValue('gray.100', 'gray.900')}
			paddingY={4}
			position={'sticky'}
			top={0}
		>
			<Container
				maxW={'container.lg'}
				as={Flex}
				gap={2}
				alignItems={'center'}
				justifyContent={'space-between'}
			>
				<Heading fontWeight={'bold'} fontSize={'lg'}>
					Weather App
				</Heading>

				<IconButton
					aria-label={'Toggle dark mode'}
					colorScheme={useColorModeValue('primary', 'secondary')}
					onClick={onOpen}
				>
					{!isOpen ? <Icon as={BiMenuAltRight} /> : <Icon as={BiX} />}
				</IconButton>
				<DrawerMenu isOpen={isOpen} onClose={onClose} />
			</Container>
		</Box>
	);
};

export default Header;
