import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  loginForm:FormGroup
  hide=true;
  submitted:boolean=false;
  constructor(private formBuild:FormBuilder,private router:Router, private spinner:NgxSpinnerService){
    this.loginForm = this.formBuild.group({
      username: [null, [Validators.required, Validators.minLength(4)]],
      email:[null,[Validators.required,Validators.email]],
      password:[ null, Validators.required],
    });
  }
  onSubmit(){
    this.spinner.show();
  console.log(this.loginForm)
  this.submitted=true;
  if(this.loginForm.invalid){
  return
  }
  }
}
