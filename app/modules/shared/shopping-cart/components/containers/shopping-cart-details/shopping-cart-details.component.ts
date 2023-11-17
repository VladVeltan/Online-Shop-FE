import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modules/shared/types/products.types';
import { ShoppingCartService } from 'src/app/modules/shared/shopping-cart/services/shopping-cart-service';
import { OrderCreate } from 'src/app/modules/shared/types/order-create.types';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-shopping-cart-details',
  templateUrl: './shopping-cart-details.component.html'
})
export class ShoppingCartDetailsComponent implements OnInit {
  products: Product[] = [];
  apiUrl = environment.apiUrl;

  constructor(
    private cartService: ShoppingCartService,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.products = this.cartService.getCartItems();
  }
  placeOrder(order: OrderCreate) {
    this.http.post(this.apiUrl + '/orders', order).subscribe(
      (response) => {
        this.cartService.clearCart();
      })
  }
}
