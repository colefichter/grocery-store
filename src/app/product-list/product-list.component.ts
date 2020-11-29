import { Component } from '@angular/core';

import { Product } from '../models';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { getAllProducts } from '../selectors';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  products$: Observable<Product[]>;

  constructor(private store: Store<{ products: Product[] }>) {
    this.products$ = store.pipe(select(getAllProducts));
  }
}
