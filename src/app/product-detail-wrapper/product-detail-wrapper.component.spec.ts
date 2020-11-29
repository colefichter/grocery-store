import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailWrapperComponent } from './product-detail-wrapper.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Product } from '../models';
import { getProductById } from '../selectors';

describe('ProductDetailWrapperComponent', () => {
  let component: ProductDetailWrapperComponent;
  let fixture: ComponentFixture<ProductDetailWrapperComponent>;
  let store: MockStore;
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ProductDetailWrapperComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: getProductById,
              value: mockProducts[0],
            },
          ],
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
