import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Product } from '../models';
import { getProductById } from '../selectors';

import { ProductEditWrapperComponent } from './product-edit-wrapper.component';

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

describe('ProductEditWrapperComponent', () => {
  let component: ProductEditWrapperComponent;
  let fixture: ComponentFixture<ProductEditWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ProductEditWrapperComponent],
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEditWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
