import { createReducer, on } from '@ngrx/store';

import { Product } from '../models';
import { addToCart, removeFromCart, clearCart } from '../actions/cart.actions';

const initialState: Product[] = [];

const _cartReducer = createReducer(
  initialState,
  on(addToCart, (state, action) => [...state, action.product]),
  on(clearCart, (state) => []),
  on(removeFromCart, (state, action) => {
    const index = state.findIndex((x) => x === action.product);
    if (index >= 0) {
      return [...state.slice(0, index), ...state.slice(index + 1)];
    } else {
      return state;
    }
  })
);

export function cartReducer(state, action) {
  return _cartReducer(state, action);
}
