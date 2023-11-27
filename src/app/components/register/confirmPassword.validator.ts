import { AbstractControl, ValidationErrors } from '@angular/forms';

export class ConfirmPassword {
  static confirmPassword(control: AbstractControl): ValidationErrors | null {
    if (
      (control.get('password')?.value as string) ===
      (control.get('confirmPassword')?.value as string)
    ) {
      return null;
    }
    control.get('confirmPassword').setErrors({ mismatch: true });
  }
}
