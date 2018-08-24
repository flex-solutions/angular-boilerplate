import { Validators } from '@angular/forms';

const validationRegex = {
    onlyNumber: /^[0-9]*$/,
    notAllowSpecialCharacters: /^[^\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:]+$/
};

export {validationRegex};
