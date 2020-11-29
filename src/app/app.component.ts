import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from './models';
import { loadAllProducts } from './actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Welcome to the Grocery Store!';

  constructor(private store: Store<{ products: Product[] }>) {
    //When the home page loads, fetch the products from the API
    this.store.dispatch(loadAllProducts());
  }
}
