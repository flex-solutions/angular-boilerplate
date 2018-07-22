import { isNil, isEmpty } from 'ramda';
import { isArray, isObject } from 'util';

const isNullOrEmptyOrUndefine = (value: any) => {
  if (isArray(value) || isObject(value)) {
    return isNil(value) || isEmpty(value);
  }
  return isNil(value) || isEmpty(value) || value === 'undefined';
};

const sleep = (milliseconds: number) => {
  const start = new Date().getTime();
  for (let i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
};

export { isNullOrEmptyOrUndefine, sleep };
