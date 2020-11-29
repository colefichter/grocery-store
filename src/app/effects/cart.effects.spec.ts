import { Observable, of } from 'rxjs';
import { CartEffects } from '../effects';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { CHECKOUT_SUCCEEDED, checkoutSucceeded, clearCart } from '../actions';
import { RouterTestingModule } from '@angular/router/testing';

describe('CartEffects', () => {
  let actions$: Observable<any>;
  let effects$: CartEffects;
  let store: MockStore<{ products: [] }>;
  const initialState = { products: [] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        CartEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
      ],
    });
    effects$ = TestBed.inject(CartEffects);
    store = TestBed.inject(MockStore);
  });

  describe('checkoutSuccessful$', () => {
    it('should dispatch CLEAR_CART and navigate', (done) => {
      spyOn(effects$['router'], 'navigate');

      actions$ = of({ type: CHECKOUT_SUCCEEDED });
      effects$.checkoutSucceeded$.subscribe((action) => {
        expect(effects$['router'].navigate).toHaveBeenCalledWith(['/']);
        expect(action).toEqual(clearCart());
        done();
      });
    });
  });
});
