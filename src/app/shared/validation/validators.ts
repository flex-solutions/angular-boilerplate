import { Validators } from '@angular/forms';

const preventSpecialCharacters = () =>
Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+');

export {preventSpecialCharacters};
