import { createAction, props } from '@ngrx/store';
import { Product } from '../models';

export const ADD_TO_CART = '[Cart] Add';
export const REMOVE_FROM_CART = '[Cart] Remove';
export const CLEAR_CART = '[Cart] Clear';
export const CHECKOUT = '[Cart] Checkout';
export const CHECKOUT_SUCCEEDED = '[Cart] Checkout Succeeded';

export const addToCart = createAction(
  ADD_TO_CART,
  props<{ product: Product }>()
);

export const removeFromCart = createAction(
  REMOVE_FROM_CART,
  props<{ product: Product }>()
);

export const clearCart = createAction(CLEAR_CART);

export const checkout = createAction(
  CHECKOUT,
  props<{ productIds: number[] }>()
);

export const checkoutSucceeded = createAction(CHECKOUT_SUCCEEDED);
