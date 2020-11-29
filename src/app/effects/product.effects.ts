import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { ProductService } from '../services';

import {
  LOAD_ALL_PRODUCTS,
  CHECKOUT,
  CHECKOUT_SUCCEEDED,
  loadAllProducts,
  checkoutSucceeded,
  productsLoaded,
  ADD_NEW_PRODUCT,
  addNewProductSucceeded,
  ADD_NEW_PRODUCT_SUCCEEDED,
  editProductSucceeded,
  EDIT_PRODUCT,
  EDIT_PRODUCT_SUCCEEDED,
} from '../actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable()
export class ProductEffects {
  loadAllProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LOAD_ALL_PRODUCTS),
      mergeMap(() =>
        this.productService.getAll().pipe(
          map((products) => productsLoaded({ products })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  addNewProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ADD_NEW_PRODUCT),
      mergeMap(({ product }) =>
        this.productService.addNewProduct(product).pipe(
          tap(() => this.router.navigate(['/'])),
          map((products) => addNewProductSucceeded()),
          catchError(() => EMPTY)
        )
      )
    )
  );

  // addNewProductSucceeded$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(ADD_NEW_PRODUCT_SUCCEEDED),
  //       tap(() => this.router.navigate(['/']))
  //     ),
  //   { dispatch: false }
  // );

  editProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EDIT_PRODUCT),
      mergeMap(({ product }) =>
        this.productService.editProduct(product).pipe(
          tap(() => this.router.navigate(['/'])),
          map((products) => editProductSucceeded()),
          catchError(() => EMPTY)
        )
      )
    )
  );

  // editProductSucceeded$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(EDIT_PRODUCT_SUCCEEDED),
  //       tap(() => this.router.navigate(['/']))
  //     ),
  //   { dispatch: false }
  // );

  checkout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CHECKOUT),
      mergeMap(({ productIds }) =>
        this.productService.checkout(productIds).pipe(
          // If checkout was successful, update the local quantities by fetching the inventory again.
          map(() => checkoutSucceeded()),
          catchError(() => EMPTY)
        )
      )
    )
  );

  reloadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CHECKOUT_SUCCEEDED,
        ADD_NEW_PRODUCT_SUCCEEDED,
        EDIT_PRODUCT_SUCCEEDED
      ),
      map(() => loadAllProducts())
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private store$: Store,
    private router: Router
  ) {}
}
