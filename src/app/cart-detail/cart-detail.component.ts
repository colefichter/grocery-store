import { Component } from '@angular/core';
import { Product, CartEntry } from '../models';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  getCartEntries,
  getTotalCostOfCart,
  getCartProductIds,
} from '../selectors';
import { removeFromCart, checkout } from '../actions';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss'],
})
export class CartDetailComponent {
  entries$: Observable<CartEntry[]>;
  totalCost$: Observable<number>;
  productIds: number[];

  constructor(private store: Store<{ cart: Product[] }>) {
    this.entries$ = store.pipe(select(getCartEntries));
    this.totalCost$ = store.pipe(select(getTotalCostOfCart));
    store
      .pipe(select(getCartProductIds))
      .subscribe((ids: number[]) => (this.productIds = ids));
  }

  removeFromCart(product: Product) {
    this.store.dispatch(removeFromCart({ product }));
  }

  checkout(): void {
    this.store.dispatch(checkout({ productIds: this.productIds }));
  }
}
