import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../home/shared/api.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent {
  reactiveForm: FormGroup;
  post: any;
  products: any;
  currentProductId: any = null;

  constructor(private apiService: ApiService,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    private dialogRef: MatDialogRef<AddProductsComponent>) {
    this.reactiveForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
    });


   
    if (this.currentProductId) {
      debugger;
      this.apiService.getProductById('product', this.currentProductId).subscribe((sResponse) => {
        this.products = sResponse;
        this.reactiveForm.setValue({
          Name: this.products.name,
          description: this.products.description,
          price: this.products.price
        })
      })
    }
  }

  reset() {
    this.reactiveForm.reset();
  }
  onSubmitClick(post: any) {
    this.post = post;
    if (!this.currentProductId) {
      this.apiService.postRequest('product.json', this.post).subscribe((sresponse) => {
        this.toastr.success('product created successfully')
        console.log(sresponse);
        this.dialogRef.close();

      })
    } else {
      this.apiService.putRequest('product.json', this.post).subscribe((sresponse) => {
        console.log(sresponse);
        this.dialogRef.close();
      })
    }
  }
  edit(product: any) {
    this.currentProductId = product.id;
    this.reactiveForm.setValue({
      Name: product.name,
      description: product.description,
      price: product.price
    })
  }


}

