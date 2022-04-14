import { Button, useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Link as RouterLink, matchPath, useLocation } from 'react-router-dom';

type Props = {
	path: string;
	children: ReactNode;
};

const NavigationItem = ({ path, children, ...props }: Props) => {
	const { pathname } = useLocation();

	const isActive = !!matchPath(pathname, path);

	const activeStyling = {
		color: useColorModeValue('primary.500', 'white'),
		borderColor: useColorModeValue('primary.500', 'white')
	};

	const inactiveStyling = {
		color: useColorModeValue('gray.500', 'gray.300')
	};

	return (
		<Button
			{...props}
			sx={{
				...(isActive ? activeStyling : inactiveStyling)
			}}
			borderBottomWidth={2}
			borderStyle={'solid'}
			borderRadius={'0'}
			borderColor={'transparent'}
			transition={'all 0.2s ease-in-out'}
			_hover={{
				borderColor: useColorModeValue('primary.500', 'white')
			}}
			as={RouterLink}
			to={path}
		>
			{children}
		</Button>
	);
};

export default NavigationItem;
