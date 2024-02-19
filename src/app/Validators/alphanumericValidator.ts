import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function alphanumericValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }

    const isValid = /^[a-zA-Z0-9]*$/.test(value);

    return !isValid ? { 'alphanumeric': 'Username must contain only alphanumeric characters and no spaces.' } : null;
  };
}
