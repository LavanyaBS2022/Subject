import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm:FormGroup
  hide=true;
  submitted:boolean=false;
  constructor(private formBuild:FormBuilder,private router:Router, private spinner:NgxSpinnerService){
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit(){
    this.spinner.show();
  console.log(this.loginForm)
  this.submitted=true;
  }
  authenticate(){
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  
    if(this.loginForm.controls['username'].value == "test@123.com" && this.loginForm.controls['password'].value == "test@123"){
      this.router.navigate(['home']);
    }
   }
}
