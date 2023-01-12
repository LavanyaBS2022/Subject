import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  product:any;
  currentProductId: any = null;

  constructor(private apiService: ApiService,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    private dialogRef: MatDialogRef<AddProductsComponent>,@Inject(MAT_DIALOG_DATA) public data:any ) {
    this.reactiveForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      brand: new FormControl(null, [Validators.required]),
      modelName: new FormControl(null, [Validators.required]),
    });
    debugger;
    if(data){
      this.currentProductId=data.id;
      this.setFormData();
    }
  }
  setFormData(){
    this.reactiveForm.setValue({
      name:this.data.name,
      description:this.data.description,
      price:this.data.price,
      brand:this.data.brand,
      modelName:this.data.modelName
    })
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
      this.apiService.putRequest('product',this.currentProductId, this.post).subscribe((sresponse) => {
        this.toastr.success('product updated successfully')
        console.log(sresponse);
        this.dialogRef.close();
    
      })
    }
  }
  getProducts() {
    this.apiService.getRequest('product.json').subscribe((sResponse) => {
      this.products = sResponse;
    }, error => {
      this.toastr.error('Something went wrong', 'please try later')
    }
    )
  }
}

