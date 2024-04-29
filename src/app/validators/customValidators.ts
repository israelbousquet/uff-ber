import { FormControl } from '@angular/forms';

export class CustomValidators {
  static validateInputLength(control: FormControl) {
    const inputLength = control.value ? control.value.length : 0;
    if (inputLength > 75) {
      return { inputLengthInvalid: true };
    }
    return null;
  }

  static whitespaceValidator(control: FormControl) {
    const value = control.value || '';
    const isWhitespace = value.trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  static passwordValidator(control: FormControl) {
    const valueInput = control.value || '';

    const regexp = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]+$/;
    const isValid = regexp.test(valueInput);

    if (!isValid) {
      return { passwordInvalid: true };
    }
    return null;
  }
}
