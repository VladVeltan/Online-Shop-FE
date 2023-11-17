import { Component, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-product-page',
  templateUrl: './create-product-page.component.html'
})
export class CreateProductPageComponent {
  productId:string|null|undefined
  constructor(private route:ActivatedRoute){}
  mode:string='create-page'

  
  ngOnInit(): void {
    this.productId=this.route.snapshot.paramMap.get('id')
    
  }
}
