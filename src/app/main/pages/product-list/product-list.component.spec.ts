import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

import { ProductListComponent } from './product-list.component';

const list = [
  {
    date_release: '2023-08-23T00:00:00.000+00:00',
    date_revision: '2024-08-23T00:00:00.000+00:00',
    description: 'tarjeta de consumo bajo la molidad de credito',
    id: 'trj-crdt',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    name: 'tarjetas de credito',
  },
  {
    date_release: '2023-08-30T00:00:00.000+00:00',
    date_revision: '2024-08-30T00:00:00.000+00:00',
    description: 'tarjeta de consumo bajo la molidad de debito',
    id: 'trj-dbt',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    name: 'tarjetas de debito',
  },
  {
    date_release: '2023-09-30T00:00:00.000+00:00',
    date_revision: '2024-09-30T00:00:00.000+00:00',
    description: 'tarjeta de consumo bajo la molidad de prepago',
    id: 'trj-prpg',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    name: 'tarjetas de prepago',
  },
];

const item: Product = {
  date_release: '2023-09-30T00:00:00.000+00:00',
  date_revision: '2024-09-30T00:00:00.000+00:00',
  description: 'tarjeta de consumo bajo la molidad de prepago',
  id: 'trj-prpg',
  logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
  name: 'tarjetas de prepago',
};

const ProductServiceMock = {
  getProductList: () => of(list),
  deleteProduct: (productId: string) => of('Product successfully removed'),
};

const routerMock = {
  navigate: () => {},
};

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      declarations: [ProductListComponent],
      providers: [
        { provide: ProductService, useValue: ProductServiceMock },
        {
          provide: Router,
          useValue: routerMock,
        },
      ],
    });
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadProductList', () => {
    component.loadProductList();
    expect(component.productList).toEqual(list);
  });

  it('should call deleteProduct', () => {
    spyOn(component, 'loadProductList');
    component.deleteProduct('trj-crdt');
    expect(component.loadProductList).toHaveBeenCalled();
  });

  it('should call editProduct', () => {
    spyOn(routerMock, 'navigate');
    component.editProduct(item);
    expect(routerMock.navigate).toHaveBeenCalled();
  });

  it('should call onSubmit', () => {
    component.searchForm.get('search')?.setValue('credito');
    component.onSubmit();
    expect(component.productList.length).toBe(1);

    component.searchForm.get('search')?.setValue('');
    component.onSubmit();
    expect(component.productList.length).toBe(3);
  });
});
