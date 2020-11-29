import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { editProduct } from '../actions';
import { fromFormValue, Product } from '../models';
import { getProductById } from '../selectors';

@Component({
  selector: 'app-product-edit-wrapper',
  templateUrl: './product-edit-wrapper.component.html',
  styleUrls: ['./product-edit-wrapper.component.scss'],
})
export class ProductEditWrapperComponent implements OnInit {
  product$: Observable<Product>;

  constructor(private store: Store, private route: ActivatedRoute) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.product$ = this.store.pipe(select(getProductById, { id }));
  }

  ngOnInit(): void {}

  editProduct(formValue: any): void {
    const product = fromFormValue(formValue);

    this.store.dispatch(editProduct({ product }));
  }
}
