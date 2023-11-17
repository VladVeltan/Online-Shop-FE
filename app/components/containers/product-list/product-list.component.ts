import { Component, Input, OnInit } from '@angular/core';
import { products } from 'src/app/mocks/products.mocks';
import { Product } from 'src/app/modules/shared/types/products.types';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductService } from 'src/app/services/products.service';
import { AuthService } from 'src/app/services/auth.service';
import { ShoppingCartService } from 'src/app/modules/shared/shopping-cart/services/shopping-cart-service';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  user: any;
  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private cartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(): void {
    this.productService
      .getAllProducts()
      .subscribe((prod) => (this.products = prod));
  }
  isProductInCart(productId: string): boolean {
    const cartItems = this.cartService.getCartItems();
    return cartItems.some((item) => item.id === productId);
  }
  addToCart($event: Product) {
    this.cartService.addToCart($event);
  }
  callLogout() {
    this.authService.logout;
  }
}
