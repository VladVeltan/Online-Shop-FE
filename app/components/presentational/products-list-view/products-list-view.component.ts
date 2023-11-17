import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/modules/shared/types/products.types';
import { ShoppingCartService } from 'src/app/modules/shared/shopping-cart/services/shopping-cart-service';
@Component({
  selector: 'app-products-list-view',
  templateUrl: './products-list-view.component.html',
  styleUrls: ['./products-list-view.component.scss'],
})
export class ProductsListViewComponent implements OnInit{
  userRoles!:any;
  ngOnInit(): void {
    this.userRoles = JSON.parse(localStorage.getItem('roles') || '[]');
    console.log(this.userRoles);
  }
  @Input() products: Product[] | undefined;
  @Output() addToCart: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() callLogout:EventEmitter<null>=new EventEmitter<null>();
  
  
  

  onAddToCart(product: Product) {
    this.addToCart.emit(product);
  }
  
}
