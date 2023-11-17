import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/products.service';
import { Product } from 'src/app/modules/shared/types/products.types';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {
  @Input() productId: string | null | undefined;
  @Input() mode!: string;
  productForm!: FormGroup;
  product!: Product;
  concatenatedString!: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
      image: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
    
    if (this.productId) {
      this.productService.getProduct(this.productId).subscribe((product) => {
        
        this.product = product;
        this.productForm.patchValue({
          name: product.name,
          category: product.category,
          price: product.price,
          image: product.image,
          description: product.description,
        });
      });
    }
  }
  
  onSumbit($event: string) {
    this.concatenatedString = this.mode + '-' + $event;
    switch (this.concatenatedString) {
      case 'edit-page-save':
        try {
          if (this.productId) {
            const editedProduct: Product = {
              ...this.productForm.value,
              id: this.product.id,
            };
            this.productService.updateProduct(editedProduct).subscribe();
          }
        } catch {
          alert('Failed to update the product.');
        }
        break;
      case 'edit-page-cancel':
        if (this.product) this.productForm.patchValue(this.product);
        break;
      case 'create-page-save':
        try {
          const newProduct: Product = {
            ...this.productForm.value,
            id: '',
          };
          this.productService.addProduct(newProduct).subscribe();
        } catch {
          alert('Failed to create the product.');
        }
        break;
      case 'create-page-cancel':
        this.productForm.reset();     
        break;
    }
  }
}
