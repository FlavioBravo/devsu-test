import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ProductService } from './product.service';
import { Product } from '../models/product';

const productList = [
  {
    date_release: '2023-08-23T00:00:00.000+00:00',
    date_revision: '2024-08-23T00:00:00.000+00:00',
    description: 'tarjeta de consumo bajo la molidad de credito',
    id: 'trj-crdt',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    name: 'tarjetas de credito',
    open: false,
  },
  {
    date_release: '2023-08-30T00:00:00.000+00:00',
    date_revision: '2024-08-30T00:00:00.000+00:00',
    description: 'tarjeta de consumo bajo la molidad de debito',
    id: 'trj-dbt',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    name: 'tarjetas de debito',
    open: false,
  },
  {
    date_release: '2023-09-30T00:00:00.000+00:00',
    date_revision: '2024-09-30T00:00:00.000+00:00',
    description: 'tarjeta de consumo bajo la molidad de prepago',
    id: 'trj-prpg',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    name: 'tarjetas de prepago',
    open: false,
  },
];

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getProductList', () => {
    const httpTestingController = TestBed.inject(HttpTestingController);
    const resp: Product[] = productList;

    service.getProductList().subscribe((res) => {
      expect(res).toEqual(resp);
    });

    const httpRequest = httpTestingController.expectOne({
      method: 'GET',
      url: 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products',
    });

    httpRequest.flush(resp);
    httpTestingController.verify();
  });

  it('should call postAddProduct', () => {
    const httpTestingController = TestBed.inject(HttpTestingController);
    const resp: Product = {
      date_release: '2023-08-23T00:00:00.000+00:00',
      date_revision: '2024-08-23T00:00:00.000+00:00',
      description: 'tarjeta de consumo bajo la molidad de credito',
      id: 'trj-crdt',
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
      name: 'tarjetas de credito',
    };

    service.postAddProduct(resp).subscribe((res) => {
      expect(res).toEqual(resp);
    });

    const httpRequest = httpTestingController.expectOne({
      method: 'POST',
      url: 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products',
    });

    httpRequest.flush(resp);
    httpTestingController.verify();
  });

  it('should call putEditProduct', () => {
    const httpTestingController = TestBed.inject(HttpTestingController);
    const resp: Product = {
      date_release: '2023-08-23T00:00:00.000+00:00',
      date_revision: '2024-08-23T00:00:00.000+00:00',
      description: 'tarjeta de consumo bajo la molidad de credito',
      id: 'trj-crdt',
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
      name: 'tarjetas de credito',
    };

    service.putEditProduct(resp).subscribe((res) => {
      expect(res).toEqual(resp);
    });

    const httpRequest = httpTestingController.expectOne({
      method: 'PUT',
      url: 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products',
    });

    httpRequest.flush(resp);
    httpTestingController.verify();
  });

  it('should call deleteProduct', () => {
    const httpTestingController = TestBed.inject(HttpTestingController);
    const productId = 'trj-crdt';
    const resp = 'Product successfully removed';

    service.deleteProduct(productId).subscribe((res) => {
      expect(res).toEqual(resp);
    });

    const httpRequest = httpTestingController.expectOne({
      method: 'DELETE',
      url: 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products?id=trj-crdt',
    });

    httpRequest.flush(resp);
    httpTestingController.verify();
  });

  it('should call getVerifyProductId', () => {
    const httpTestingController = TestBed.inject(HttpTestingController);
    const productId = 'trj-crdt';
    const resp = true;

    service.getVerifyProductId(productId).subscribe((res) => {
      expect(res).toEqual(resp);
    });

    const httpRequest = httpTestingController.expectOne({
      method: 'GET',
      url: 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products/verification?id=trj-crdt',
    });

    httpRequest.flush(resp);
    httpTestingController.verify();
  });
});
