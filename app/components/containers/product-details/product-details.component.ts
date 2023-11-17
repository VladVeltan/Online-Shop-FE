import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/modules/shared/types/products.types';
import { ProductService } from 'src/app/services/products.service';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AuthService } from 'src/app/services/auth.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html'
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  user!:any;


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private authService:AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const productId = params['id'];
      this.productService.getProduct(productId).subscribe(product => {
        this.product = product;
      });
    });
  }
  onDeleteProduct(productId: string) {
    this.productService.deleteProduct(productId);
  }

}
