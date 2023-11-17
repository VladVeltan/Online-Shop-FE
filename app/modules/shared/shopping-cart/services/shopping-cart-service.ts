import { Injectable, OnInit } from '@angular/core';
import { Product } from '../../types/products.types';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService implements OnInit {
  private cartItems: Product[] = [];

  ngOnInit(): void {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      this.cartItems = JSON.parse(savedCartItems);
    }
  }

  private saveCartItems() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  getCartItems(): Product[] {
    return this.cartItems;
  }

  addToCart(product: Product) {
    const existingProduct = this.cartItems.find(
      (item) => item.id === product.id
    );
    if (existingProduct) {
      return;
    }
    this.cartItems.push(product);
    this.saveCartItems(); // Save products in Local Storage
  }

  removeFromCart(productId: string) {
    this.cartItems = this.cartItems.filter((item) => item.id !== productId);
    this.saveCartItems(); // Save the updated cart items in Local Storage
  }
  getCartItemById(productId: string): Product | undefined {
    return this.cartItems.find((item) => item.id === productId);
  }
  clearCart() {
    this.cartItems = []; // Clear the cartItems array
    this.saveCartItems(); // Save the empty cartItems in Local Storage
  }
}
