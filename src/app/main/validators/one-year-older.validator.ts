import { AbstractControl, ValidationErrors } from '@angular/forms';

export function oneYearOlderValidator(
  form: AbstractControl
): ValidationErrors | null {
  if (!form.get('date_release')?.value || !form.get('date_revision')?.value) {
    return null;
  }
  const date_release = new Date(`${form.get('date_release')?.value} 00:00:00`);
  date_release.setFullYear(date_release.getFullYear() + 1);
  const date_revision = new Date(
    `${form.get('date_revision')?.value} 00:00:00`
  );

  if (date_release && date_revision) {
    const isRangeValid = date_release.getTime() - date_revision.getTime();

    return isRangeValid === 0 ? null : { oneYearOlder: true };
  }
  return null;
}
