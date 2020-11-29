import { Observable, of } from 'rxjs';
import { ProductEffects } from './product.effects';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ProductService } from '../services';
import {
  productsLoaded,
  LOAD_ALL_PRODUCTS,
  ADD_NEW_PRODUCT,
  addNewProductSucceeded,
  CHECKOUT,
  checkoutSucceeded,
  CHECKOUT_SUCCEEDED,
  loadAllProducts,
  ADD_NEW_PRODUCT_SUCCEEDED,
  EDIT_PRODUCT_SUCCEEDED,
} from '../actions';
import { Product } from '../models';
import { RouterTestingModule } from '@angular/router/testing';

const mockNewProduct = {
  id: -1,
  name: 'New Product',
  price: 4.99,
  quantity: 99,
} as Product;

const mockProducts: Product[] = [
  { id: 999, name: 'Product 1', price: 4.99, quantity: 99 } as Product,
  { id: 888, name: 'Product 2', price: 14.99, quantity: 88 } as Product,
  {
    id: 777,
    name: 'Product 3',
    price: 24.99,
    quantity: 77,
    imageUrl: 'http://nowhere.com',
  } as Product,
];

class MockProductService {
  getAll(): Observable<Product[]> {
    return of(mockProducts);
  }

  checkout(): Observable<any> {
    return of(true);
  }

  addNewProduct(): Observable<any> {
    return of(true);
  }
}

describe('ProductEffects', () => {
  let actions$: Observable<any>;
  let effects$: ProductEffects;
  let store: MockStore<{ products: [] }>;
  const initialState = { products: [] };
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        ProductEffects,
        provideMockStore({ initialState }),
        provideMockActions(() => actions$),
        { provide: ProductService, useClass: MockProductService },
      ],
    });

    effects$ = TestBed.inject(ProductEffects);
    store = TestBed.inject(MockStore);
    productService = TestBed.inject(ProductService);
  });

  describe('loadAllProducts$', () => {
    it('should fetch the product list', (done) => {
      const spy = spyOn(productService, 'getAll').and.callThrough();

      actions$ = of({ type: LOAD_ALL_PRODUCTS });
      effects$.loadAllProducts$.subscribe((action) => {
        expect(action).toEqual(productsLoaded({ products: mockProducts }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });

  describe('addNewProduct$', () => {
    it('should run successfully', (done) => {
      const spy = spyOn(productService, 'addNewProduct').and.callThrough();

      actions$ = of({ type: ADD_NEW_PRODUCT, product: mockNewProduct });
      effects$.addNewProduct$.subscribe((action) => {
        expect(action).toEqual(addNewProductSucceeded());
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });

  // describe('addNewProductSucceeded$', () => {
  //   it('should navigate', (done) => {
  //     spyOn(effects$['router'], 'navigate');

  //     actions$ = of({ type: ADD_NEW_PRODUCT_SUCCEEDED });
  //     effects$.addNewProductSucceeded$.subscribe((action) => {
  //       expect(effects$['router'].navigate).toHaveBeenCalledWith(['/']);
  //       done();
  //     });
  //   });
  // });

  describe('checkout$', () => {
    it('should run successfully', (done) => {
      const spy = spyOn(productService, 'checkout').and.callThrough();

      actions$ = of({ type: CHECKOUT, productIds: [1, 2, 3, 4] });
      effects$.checkout$.subscribe((action) => {
        expect(action).toEqual(checkoutSucceeded());
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });

  describe('reloadProducts$', () => {
    it('should respond to CHECKOUT_SUCCEEDED action', (done) => {
      actions$ = of({ type: CHECKOUT_SUCCEEDED });
      effects$.reloadProducts$.subscribe((action) => {
        expect(action).toEqual(loadAllProducts());
        done();
      });
    });

    it('should respond to ADD_NEW_PRODUCT_SUCCEEDED action', (done) => {
      actions$ = of({ type: ADD_NEW_PRODUCT_SUCCEEDED });
      effects$.reloadProducts$.subscribe((action) => {
        expect(action).toEqual(loadAllProducts());
        done();
      });
    });

    it('should respond to EDIT_PRODUCT_SUCCEEDED action', (done) => {
      actions$ = of({ type: EDIT_PRODUCT_SUCCEEDED });
      effects$.reloadProducts$.subscribe((action) => {
        expect(action).toEqual(loadAllProducts());
        done();
      });
    });
  });
});
