import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { StoreModule } from '@ngrx/store';
import { productReducer, cartReducer } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects, CartEffects } from './effects';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ProductDetailWrapperComponent } from './product-detail-wrapper/product-detail-wrapper.component';
import { CartDetailComponent } from './cart-detail/cart-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductEditorComponent } from './product-editor/product-editor.component';
import { ProductAddWrapperComponent } from './product-add-wrapper/product-add-wrapper.component';
import { ProductEditWrapperComponent } from './product-edit-wrapper/product-edit-wrapper.component';

const MATERIAL_MODULES = [
  MatListModule,
  MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductDetailWrapperComponent,
    CartDetailComponent,
    ProductEditorComponent,
    ProductAddWrapperComponent,
    ProductEditWrapperComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ...MATERIAL_MODULES,
    StoreModule.forRoot({ products: productReducer, cart: cartReducer }),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([ProductEffects, CartEffects]),
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
