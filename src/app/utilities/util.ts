import { isNil, isEmpty } from 'ramda';
import { isArray, isObject } from 'util';

const isNullOrEmptyOrUndefined = (value: any) => {
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

const parseStringToBoolean = (string) => {
  let bool;
  bool = (function() {
    switch (false) {
      case string.toLowerCase() !== 'true':
        return true;
      case string.toLowerCase() !== 'false':
        return false;
    }
  })();
  if (typeof bool === 'boolean') {
    return bool;
  }
  return void 0;
};

export { isNullOrEmptyOrUndefined, sleep, parseStringToBoolean };
