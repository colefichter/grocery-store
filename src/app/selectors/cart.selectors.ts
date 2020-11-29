import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as _ from 'lodash';

import { Product, CartEntry } from '../models';

export const cartFeatureKey = 'cart';

interface AppState {
  cart: Product[];
}

// Private util to help with rounding:
function roundCurrency(n: number) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

// This is the bare list of products
export const getCartProducts = createFeatureSelector<AppState, Product[]>(
  cartFeatureKey
);

// Get a list of product IDs. If there are multiple quantities of a product, there will be duplicate IDs.
export const getCartProductIds = createSelector(
  getCartProducts,
  (products: Product[]) => products.map((x) => x.id)
);

// This groups the list of cart products and counts them for aggregated display in the cart view.
export const getCartEntries = createSelector(
  getCartProducts,
  (products: Product[]) => {
    var groupedProducts = _(products)
      .groupBy('id')
      .map((products, id) => {
        return {
          product: products[0],
          quantity: products.length,
          lineTotal: roundCurrency(products[0].price * products.length),
        } as CartEntry;
      })
      .value();

    return _.sortBy(groupedProducts, 'product.name');
  }
);

export const getTotalCostOfCart = createSelector(
  getCartProducts,
  (products: Product[]) => roundCurrency(_.sumBy(products, 'price'))
);
