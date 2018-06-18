import { isNil, isEmpty } from 'ramda';
import { isArray, isObject } from 'util';


const isNullOrEmptyOrUndefine = (value: any) => {
    if (isArray(value) || isObject(value)) {
        return isNil(value) || isEmpty(value);
    }
    return isNil(value) || isEmpty(value) || value === 'undefined';
};

export { isNullOrEmptyOrUndefine };
