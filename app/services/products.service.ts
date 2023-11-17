import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/modules/shared/types/products.types';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiBaseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiBaseUrl}/products`);
  }  
  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiBaseUrl}/products/${productId}`);
  }
  deleteProduct(productId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/products/${productId}`);
  }
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiBaseUrl}/products/${product.id}`, product);
  }
  addProduct(newProduct: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiBaseUrl}/products`, newProduct);
  }
  
}