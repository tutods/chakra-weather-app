import { format as dateFnsFormat } from 'date-fns';

const convertTimestamp = (timestamp: number) => {
	return dateFnsFormat(new Date(timestamp * 1000), 'dd/MM/yyyy');
};

const getByTimestamp = (timestamp: number, format = 'dd') => {
	return dateFnsFormat(new Date(timestamp * 1000), format);
};

const getTimestampWeekDay = (timestamp: number) => {
	return dateFnsFormat(new Date(timestamp * 1000), 'EEEE');
};

export { convertTimestamp, getByTimestamp, getTimestampWeekDay };
