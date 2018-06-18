import * as moment from 'moment';

export const calculateRelativeTime = (value, locale = 'en') => moment(value).locale(locale).fromNow();
