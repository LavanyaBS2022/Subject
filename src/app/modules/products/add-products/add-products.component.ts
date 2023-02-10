import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  product: any;
  currentProductId: any = null;
  imageURL: string;

  constructor(private apiService: ApiService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<AddProductsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.reactiveForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      description: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      brand_name: new FormControl(null, [Validators.required]),
      model_name: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required]),
    });
    if (data) {
      this.product = data.products;
      this.currentProductId = this.product.id;
      this.setForm();
    }

  }
  setForm() {
    if (this.product != null) {
      this.reactiveForm.setValue({
        name: this.product.name,
        description: this.product.description,
        price: this.product.price,
        brand_name: this.product.brand_name,
        model_name: this.product.model_name,
        image: this.product.image,
      })
    }
  }

  reset() {
    this.reactiveForm.reset();
  }

  onFormSubmit(post: any) {
    this.post = post;
    if (!this.currentProductId) {
      let postData = JSON.parse(JSON.stringify(this.reactiveForm.value));
      delete postData.image;

      let formData = new FormData();
      formData.append('image', this.reactiveForm.value.image);
      formData.append('payload', JSON.stringify(postData));

      this.apiService.postRequest('/products/', formData).subscribe((sresponse) => {
        this.toastr.success('product created successfully')
        console.log(sresponse);
        this.dialogRef.close();

      })
    }
    else {
      debugger
      let postData = JSON.parse(JSON.stringify(this.reactiveForm.value));
      delete postData.image;
      let formData = new FormData();
      formData.append('image', this.reactiveForm.value.image);
      formData.append('payload', JSON.stringify(postData));
      this.apiService.putRequest('/products/', this.currentProductId, formData).subscribe((sresponse) => {
        this.toastr.success('product updated successfully')
        console.log(sresponse);
        this.dialogRef.close();
      })
    }
  }

  showPreview(event: any) {
    const file = (event.target as HTMLInputElement).files[0];
    this.reactiveForm.patchValue({
      image: file
    });
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }


}

