import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addNewProdcut } from '../actions';
import { fromFormValue, Product } from '../models';

@Component({
  selector: 'app-product-add-wrapper',
  templateUrl: './product-add-wrapper.component.html',
  styleUrls: ['./product-add-wrapper.component.scss'],
})
export class ProductAddWrapperComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {}

  addProduct(formValue: any): void {
    const product = fromFormValue(formValue);

    this.store.dispatch(addNewProdcut({ product }));
  }
}
