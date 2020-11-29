import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailWrapperComponent } from './product-detail-wrapper/product-detail-wrapper.component';
import { ProductAddWrapperComponent } from './product-add-wrapper/product-add-wrapper.component';
import { ProductEditWrapperComponent } from './product-edit-wrapper/product-edit-wrapper.component';

const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'product/new', component: ProductAddWrapperComponent },
  { path: 'product/:id/edit', component: ProductEditWrapperComponent },
  { path: 'product/:id', component: ProductDetailWrapperComponent },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
