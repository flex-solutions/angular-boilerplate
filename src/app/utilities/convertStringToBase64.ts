import { isNullOrEmptyOrUndefine } from './util';

// This is API to set base 64 for binary string
function convertStringToBase64(stringInput: any) {
  let base64 = '';
  if (!isNullOrEmptyOrUndefine(stringInput)) {
    try {
      base64 = atob(stringInput);
    } catch {
      base64 = stringInput;
    }
  }
  return base64;
}

export { convertStringToBase64 };
