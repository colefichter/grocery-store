import { createSelector, createFeatureSelector } from '@ngrx/store';

import { Product } from '../models';

export const productFeatureKey = 'products';

interface AppState {
  products: Product[];
}

export const getAllProducts = createFeatureSelector<AppState, Product[]>(
  productFeatureKey
);

export const getProductById = createSelector(
  getAllProducts,
  (products: Product[], props: { id: number }) =>
    products.find((x: { id: number }) => x.id === props.id)
);
