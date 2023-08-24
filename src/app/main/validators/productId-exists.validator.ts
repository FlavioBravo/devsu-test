import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { map } from 'rxjs';
import { ProductService } from '../services/product.service';

export function productIdExistsValidator(
  productService: ProductService
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return productService
      .getVerifyProductId(control.value)
      .pipe(map((response) => (response ? { userExists: true } : null)));
  };
}
