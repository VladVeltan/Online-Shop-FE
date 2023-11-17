import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartDetailsComponent } from './modules/shared/shopping-cart/components/containers/shopping-cart-details/shopping-cart-details.component';
import { ProductListComponent } from './components/containers/product-list/product-list.component';
import { ProductDetailsComponent } from './components/containers/product-details/product-details.component';
import { CreateProductPageComponent } from './components/pages/create-product-page/create-product-page.component';
import { EditProductPageComponent } from './components/pages/edit-product-page/edit-product-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
  },
  {
    path: 'cart',
    component: ShoppingCartDetailsComponent,
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'products',
    component: ProductListComponent,
  },
  {
    path:'edit/:id',component:EditProductPageComponent
  },
  {
    path:'add',component:CreateProductPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
