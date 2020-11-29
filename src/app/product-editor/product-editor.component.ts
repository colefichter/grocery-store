import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { addNewProdcut } from '../actions';
import { Product } from '../models';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss'],
})
export class ProductEditorComponent implements OnInit {
  @Input() product: Product;
  @Input() formData: Product;

  @Output() onSubmit = new EventEmitter<Product>();

  productForm = this.fb.group({
    id: [''], //not for display
    name: ['', Validators.required],
    price: [
      '',
      [Validators.required, Validators.pattern('^[0-9]+\\.[0-9][0-9]')],
    ],
    quantity: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    imageUrl: [''],
  });

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {
    //Insert values when editing.
    if (this.formData) {
      this.productForm.patchValue(this.formData);
    }
  }

  onSubmitForm(): void {
    if (this.productForm.valid) {
      this.onSubmit.emit(this.productForm.value);
    }
  }
}
