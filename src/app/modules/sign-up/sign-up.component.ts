import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../home/shared/api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signUpForm:FormGroup
  hide=true;
  submitted:boolean=false;
  constructor(private apiService:ApiService,private toastr:ToastrService, private formBuild:FormBuilder,private router:Router, private spinner:NgxSpinnerService){
    this.signUpForm = this.formBuild.group({
      username: [null, [Validators.required, Validators.minLength(4)]],
      password:[ null, Validators.required],
      confirmPassword:[ null, Validators.required],
    });
  }

  onSubmit(){
    debugger
  this.submitted=true;
  if(this.signUpForm.controls['password'].value==this.signUpForm.controls['confirmPassword'].value){

    let formdata=JSON.parse(JSON.stringify(this.signUpForm.value));
      delete formdata.confirmPassword;

      this.apiService.postRequest('/products/sign-up',formdata).subscribe((sresponse) => {

        if(sresponse.status == true){
          this.toastr.success('Registered successfully','Success');
          this.router.navigate(['login']);
        }
      }, error =>{
        this.toastr.error('Something went wrong','Try again');
      });  
  }else{
    this.toastr.error('Password mismatch','Please try again')
  }
}
}

