import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { getOneYearOlder } from '../../utils/utils';
import { minimunDateValidator } from '../../validators/minimun-date.validator';
import { oneYearOlderValidator } from '../../validators/one-year-older.validator';
import { productIdExistsValidator } from '../../validators/productId-exists.validator';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.scss'],
})
export class ProductAddEditComponent implements OnInit {
  productForm = this.fb.group(
    {
      id: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10),
          ],
          asyncValidators: [productIdExistsValidator(this.productService)],
        },
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      logo: ['', Validators.required],
      date_release: ['', [Validators.required, minimunDateValidator()]],
      date_revision: ['', [Validators.required]],
    },
    {
      validator: oneYearOlderValidator,
    }
  );

  isEditedProduct = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    const data =
      this.router?.getCurrentNavigation()?.extras?.state?.['response'];
    if (data) {
      this.clearIdAsyncValidators();
      this.productForm.patchValue(data.item);
      this.isEditedProduct = true;
    }
  }

  ngOnInit(): void {
    this.productForm.get('date_release')?.valueChanges.subscribe((value) => {
      if (value) {
        const date_revision = new Date(`${value} 00:00:00`);
        date_revision.setFullYear(date_revision.getFullYear() + 1);
        this.productForm
          .get('date_revision')
          ?.setValue(getOneYearOlder(date_revision));
      }
    });
  }

  clearIdAsyncValidators() {
    this.productForm.get('id')?.clearAsyncValidators();
    this.productForm.get('id')?.updateValueAndValidity();
  }

  onSubmit() {
    if (!this.isEditedProduct) {
      this.addProduct();
    } else {
      this.editProduct();
    }
  }

  addProduct() {
    this.productService
      .postAddProduct(this.productForm.value)
      .subscribe((response) => {
        this.productForm.reset();
      });
  }

  editProduct() {
    this.productService
      .putEditProduct(this.productForm.value)
      .subscribe((response) => {});
  }
}
