import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minimunDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const today = new Date();

    const dateRelease = new Date(`${value} 23:59:59`);

    return dateRelease.getTime() >= today.getTime()
      ? null
      : { minimunDate: true };
  };
}
