import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { ProductListComponent } from './product-list.component';
import { Product } from '../models';
import { MemoizedSelector } from '@ngrx/store';
import { getAllProducts } from '../selectors';
import { By } from '@angular/platform-browser';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let store: MockStore;
  let mockProductsSelector: MemoizedSelector<{ products: [] }, Product[]>;
  const initialState = { products: [] };
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
      declarations: [ProductListComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    mockProductsSelector = store.overrideSelector(getAllProducts, mockProducts);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list the products', () => {
    expect(fixture.debugElement.queryAll(By.css('mat-list-item')).length).toBe(
      3
    );
  });

  it('should list the product name', () => {
    const elements = fixture.debugElement.queryAll(By.css('h3 a'));
    expect(elements[0].nativeElement.textContent).toBe('Product 1');
  });

  it('should list the product price', () => {
    const elements = fixture.debugElement.queryAll(By.css('span.price'));
    expect(elements[0].nativeElement.textContent).toBe('$4.99');
  });

  it('should list the product quantity', () => {
    const elements = fixture.debugElement.queryAll(By.css('span.quantity'));
    expect(elements[0].nativeElement.textContent).toBe('99 in stock');
  });

  it('should render product images', () => {
    const elements = fixture.debugElement.queryAll(By.css('img'));
    expect(elements[2].nativeElement.src).toBe('http://nowhere.com/');
  });

  it("should render default images when the product doesn't have one", () => {
    const elements = fixture.debugElement.queryAll(By.css('img'));
    expect(elements[0].nativeElement.src).toBe(
      'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'
    );
  });
});
