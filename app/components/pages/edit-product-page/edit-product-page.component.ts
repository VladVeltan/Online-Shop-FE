import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/modules/shared/types/products.types';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-product-page',
  templateUrl: './edit-product-page.component.html'
})
export class EditProductPageComponent {
  productId: string | null | undefined;
  constructor(private route: ActivatedRoute,private productService:ProductService) {}
  mode:string='edit-page';

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    
  }
}
