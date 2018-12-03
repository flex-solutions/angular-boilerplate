import { AddressPipe } from './address.pipe';
import { DateFormat, DateTimeFormat } from './format-date.pipe';

export const GlobalPipes = [
    AddressPipe,
    DateFormat,
    DateTimeFormat
];
