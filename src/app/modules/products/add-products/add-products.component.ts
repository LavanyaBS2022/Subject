import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../home/shared/api.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent {
  reactiveForm: FormGroup;
  post: any;
  products:any=[];

  constructor(private apiService:ApiService) {
  this.reactiveForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
  });
}

ngOnInit(){
  this.apiService.getRequest('product.json').subscribe((sresponse)=>{
   this.products=sresponse;
  }
  )
}
reset() {
  this.reactiveForm.reset();
}
onSubmitClick(post:any){
  this.post=post;
  this.apiService.postRequest('product.json',this.post).subscribe((sresponse)=>(
    console.log(sresponse)
  ))
  console.log(this.reactiveForm);
}

}

