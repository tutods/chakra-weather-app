import { Flex, Spinner } from '@chakra-ui/react';

const Loading = () => {
	return (
		<Flex
			zIndex={999}
			position={'absolute'}
			top={0}
			right={0}
			bottom={0}
			left={0}
			justifyContent={'center'}
			alignItems={'center'}
			height={'100vh'}
			backgroundColor={'blackAlpha.700'}
		>
			<Spinner color={'white'} size={'xl'} />
		</Flex>
	);
};

export default Loading;
