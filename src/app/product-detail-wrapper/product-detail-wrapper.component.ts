import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { getProductById } from '../selectors';

@Component({
  selector: 'app-product-detail-wrapper',
  templateUrl: './product-detail-wrapper.component.html',
  styleUrls: ['./product-detail-wrapper.component.scss'],
})
export class ProductDetailWrapperComponent {
  product$: Observable<Product>;

  constructor(
    private store: Store<{ products: Product[] }>,
    private route: ActivatedRoute
  ) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.product$ = this.store.pipe(select(getProductById, { id }));
  }
}
