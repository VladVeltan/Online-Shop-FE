import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/modules/shared/types/products.types';
import { ShoppingCartService } from 'src/app/modules/shared/shopping-cart/services/shopping-cart-service';
@Component({
  selector: 'app-product-details-view',
  templateUrl: './product-details-view.component.html',
  styleUrls: ['./product-details-view.component.scss'],
})
export class ProductsDetailsViewComponent {
  @Input() product!: Product;
  @Input() user!:any;
  @Output() deleteProduct = new EventEmitter<string>(); 

  userRoles = JSON.parse(localStorage.getItem('roles') || '[]');


  onDeleteProduct(productId: string) {
    if (window.confirm('Are you sure you want to delete this product?')) {
      this.deleteProduct.emit(productId); 
    }
  }
}
