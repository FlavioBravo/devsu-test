import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly _routeURL =
    'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros';

  constructor(private readonly _http: HttpClient) {}

  getProductList(): Observable<Product[]> {
    return this._http
      .get(`${this._routeURL}/bp/products`)
      .pipe(
        map((response: any) =>
          response.map((item: any) => ({ ...item, open: false }))
        )
      );
  }

  postAddProduct(data: Product): Observable<Product> {
    return this._http
      .post(`${this._routeURL}/bp/products`, data)
      .pipe(map((response: any) => response));
  }

  putEditProduct(data: Product): Observable<Product> {
    return this._http
      .put(`${this._routeURL}/bp/products`, data)
      .pipe(map((resp: any) => resp));
  }

  deleteProduct(productId: string): Observable<string> {
    return this._http
      .delete(`${this._routeURL}/bp/products?id=${productId}`)
      .pipe(map((response: any) => response));
  }

  getVerifyProductId(productId: string): Observable<boolean> {
    return this._http
      .get(`${this._routeURL}/bp/products/verification?id=${productId}`)
      .pipe(map((response: any) => response));
  }
}
