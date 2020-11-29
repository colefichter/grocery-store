import { createReducer, on } from '@ngrx/store';

import { Product } from '../models';
import { productsLoaded } from '../actions';

const initialState: Product[] = [];

const _productReducer = createReducer(
  initialState,
  on(productsLoaded, (state, action: any) => action.products)
);

export function productReducer(state, action) {
  return _productReducer(state, action);
}
