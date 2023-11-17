import { Component, Input, OnInit, Output, EventEmitter  } from '@angular/core';
import { Product } from 'src/app/modules/shared/types/products.types';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-product-form-view',
  templateUrl: './product-form-view.component.html',
  styleUrls: ['./product-form-view.component.scss'],
})
export class ProductFormViewComponent {
  @Input() product!: Product;
  @Input() productForm!:FormGroup
  @Output() onSumbit: EventEmitter<string> = new EventEmitter<string>();
  
}
