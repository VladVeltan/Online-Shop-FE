import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/modules/shared/types/products.types';
import { ShoppingCartService } from 'src/app/modules/shared/shopping-cart/services/shopping-cart-service';
import { OrderCreate } from 'src/app/modules/shared/types/order-create.types';
import { ProductIdAndQuantity } from 'src/app/modules/shared/types/product-id-and-quantity.types';

@Component({
  selector: 'app-shopping-cart-details-view',
  templateUrl: './shopping-cart-details-view.component.html',
  styleUrls: ['./shopping-cart-details-view.component.scss'],
})
export class ShoppingCartDetailsViewComponent {
  @Input() products!: Product[];
  @Output() placeOrder = new EventEmitter<OrderCreate>();
  productIdAndQuantities: ProductIdAndQuantity[] = [];

  constructor(private cartService: ShoppingCartService) {}

  onRemoveButtonClick(product: Product) {
    
    this.cartService.removeFromCart(product.id);
    this.products = this.cartService.getCartItems();
  }

  onUpdateQuantity(productId: string, quantity: number) {
    // Check if the productId already exists in the list
    if (quantity < 0) return;

    const existingProductIndex = this.productIdAndQuantities.findIndex(
      (item) => item.productId === productId
    );

    if (existingProductIndex !== -1) {
      this.productIdAndQuantities[existingProductIndex].quantity = quantity;
    } else {
      const productIdAndQuantity: ProductIdAndQuantity = {
        productId: productId,
        quantity: quantity,
      };

      this.productIdAndQuantities.push(productIdAndQuantity);
    }
   
  }

  onCheckout() {
    if (window.confirm('Are you sure you want to checkout?')) {
      // Create the OrderCreateDto instance
      const order: OrderCreate = {
        customerId: 'de96921d-2f8d-46e7-8061-31468180de96', // Set the customer ID here

        products: this.productIdAndQuantities,
      };

      this.placeOrder.emit(order); // Emit the custom event with the order data
    }
  }
}
