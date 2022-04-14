import 'assets/styles/global.scss';

import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import theme from 'assets/styles/theme';
import Main from 'pages/Main';
import { render } from 'react-dom';

render(
	<ChakraProvider theme={theme}>
		<CSSReset />
		<Main />
	</ChakraProvider>,
	document.getElementById('root')
);
