import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ProductAddEditComponent } from './product-add-edit.component';

const productItem: Product = {
  date_release: '2023-08-23T00:00:00.000+00:00',
  date_revision: '2024-08-23T00:00:00.000+00:00',
  description: 'tarjeta de consumo bajo la molidad de credito',
  id: 'trj-crdt',
  logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
  name: 'tarjetas de credito',
};

const ProductServiceMock = {
  postAddProduct: (item: Product) => of(item),
  putEditProduct: (item: Product) => of(item),
  getVerifyProductId: (value: string) => of(true),
};

const item: any = {
  date_release: '2023-08-23T00:00:00.000+00:00',
  date_revision: '2024-08-23T00:00:00.000+00:00',
  description: 'tarjeta de consumo bajo la molidad de credito',
  id: 'trj-crdt',
  logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
  name: 'tarjetas de credito',
};

const routerMock = {
  getCurrentNavigation: () => {
    return {
      extra: {
        state: {
          response: {
            data: item,
          },
        },
      },
    };
  },
};

describe('ProductAddEditComponent', () => {
  let component: ProductAddEditComponent;
  let fixture: ComponentFixture<ProductAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ProductAddEditComponent],
      providers: [
        FormBuilder,
        { provide: ProductService, useValue: ProductServiceMock },
        {
          provide: Router,
          useValue: routerMock,
        },
      ],
    });
    fixture = TestBed.createComponent(ProductAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit', () => {
    spyOn(component, 'addProduct');
    component.isEditedProduct = false;
    component.onSubmit();
    expect(component.addProduct).toHaveBeenCalled();

    spyOn(component, 'editProduct');
    component.isEditedProduct = true;
    component.onSubmit();
    expect(component.editProduct).toHaveBeenCalled();
  });

  it('should call addProduct', () => {
    //spyOn(ProductServiceMock, 'postAddProduct');
    component.productForm.setValue(productItem);
    component.addProduct();
    expect(component.productForm.value).toEqual({
      date_release: null,
      date_revision: null,
      description: null,
      id: null,
      logo: null,
      name: null,
    });
  });

  it('should call editProduct', () => {
    component.productForm.setValue(productItem);
    component.editProduct();
    expect(component.productForm.value).toEqual(productItem);
  });

  it('should call ngOnInit', () => {
    component.ngOnInit();
    component.productForm.get('date_release')?.setValue('2023-08-24');
    expect(component.productForm.get('date_revision')?.value).toBe(
      '2024-08-24'
    );
  });

  it('should call clearIdAsyncValidators', () => {
    component.clearIdAsyncValidators();
  });
});
