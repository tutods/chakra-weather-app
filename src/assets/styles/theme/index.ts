import { extendTheme } from '@chakra-ui/react';

import colors from './partials/colors';
import fonts from './partials/fonts';

const theme = extendTheme({
	fonts,
	colors
});

export default theme;
