import { TestBed } from '@angular/core/testing';

import { ProductService, BASE_URL } from './product.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Product } from '../models';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a product list', () => {
    const mockProducts: Product[] = [
      { id: 999, name: 'Product 1', price: 4.99, quantity: 99 } as Product,
      { id: 888, name: 'Product 2', price: 14.99, quantity: 88 } as Product,
      { id: 777, name: 'Product 3', price: 24.99, quantity: 77 } as Product,
    ];

    service.getAll().subscribe((products) => {
      expect(products.length).toBe(3);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(BASE_URL + 'products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should send a checkout request', () => {
    const productIds: number[] = [1, 2, 3, 4, 5];
    service.checkout(productIds).subscribe((bogusResponse) => {
      //nothing to do here.
      expect(bogusResponse).toBeTruthy();
    });

    const req = httpMock.expectOne(BASE_URL + 'products/checkout');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(productIds);
    req.flush({});
  });

  it('should send an add-new-product request', () => {
    const product: Product = {
      id: null,
      name: 'Test Product 1',
      price: 0.99,
      quantity: 99,
      imageUrl: null,
    };
    service.addNewProduct(product).subscribe((bogusResponse) => {
      //nothing to do here.
      expect(bogusResponse).toBeTruthy();
    });

    const req = httpMock.expectOne(BASE_URL + 'products');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(product);
    req.flush({});
  });
});
