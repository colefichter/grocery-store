import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDetailComponent } from './cart-detail.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('CartDetailComponent', () => {
  let component: CartDetailComponent;
  let fixture: ComponentFixture<CartDetailComponent>;
  let store: MockStore;
  const initialState = { cart: [] };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CartDetailComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
