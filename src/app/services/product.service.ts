import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../models';

export const BASE_URL = 'https://localhost:5001/';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(BASE_URL + 'products');
  }

  checkout(productIds: number[]): Observable<any> {
    return this.http.post(BASE_URL + 'products/checkout', productIds);
  }

  addNewProduct(product: Product): Observable<any> {
    return this.http.post(BASE_URL + 'products', product);
  }

  editProduct(product: Product): Observable<any> {
    return this.http.put(BASE_URL + `products/${product.id}`, product);
  }
}
