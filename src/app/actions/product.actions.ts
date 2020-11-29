import { createAction, props } from '@ngrx/store';
import { Product } from '../models';

export const LOAD_ALL_PRODUCTS = '[Products] Load All';
export const PRODUCTS_LOADED = '[Products] Loaded';
export const ADD_NEW_PRODUCT = '[Products] Add New';
export const ADD_NEW_PRODUCT_SUCCEEDED = '[Products] Add New Succeeded';
export const EDIT_PRODUCT = '[Products] Edit';
export const EDIT_PRODUCT_SUCCEEDED = '[Products] Edit Succeeded';

export const loadAllProducts = createAction(LOAD_ALL_PRODUCTS);
export const productsLoaded = createAction(
  PRODUCTS_LOADED,
  props<{ products: Product[] }>()
);

export const addNewProdcut = createAction(
  ADD_NEW_PRODUCT,
  props<{ product: Product }>()
);
export const addNewProductSucceeded = createAction(ADD_NEW_PRODUCT_SUCCEEDED);

export const editProduct = createAction(
  EDIT_PRODUCT,
  props<{ product: Product }>()
);
export const editProductSucceeded = createAction(EDIT_PRODUCT_SUCCEEDED);
