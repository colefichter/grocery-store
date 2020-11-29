import { Component, Input } from '@angular/core';
import { Product } from '../models';
import { Store } from '@ngrx/store';

import { addToCart, removeFromCart } from '../actions';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  @Input() product: Product;

  constructor(private store: Store<{ products: Product[] }>) {}

  addToCart(): void {
    this.store.dispatch(addToCart({ product: this.product }));
  }

  removeFromCart(): void {
    this.store.dispatch(removeFromCart({ product: this.product }));
  }
}
