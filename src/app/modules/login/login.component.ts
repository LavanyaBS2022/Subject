import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from '../home/shared/shared.service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../home/shared/api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm:FormGroup
  hide=true;
  submitted:boolean=false;
  constructor(private formBuild:FormBuilder,private router:Router, private spinner:NgxSpinnerService, private sharedService:SharedService,private apiService: ApiService,
    private toastr: ToastrService){
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit(){
    this.spinner.show();
  console.log(this.loginForm)
  this.submitted=true;
  this.apiService.postRequest('/products/login',this.loginForm.value).subscribe((sresponse) => { 
    debugger 
    if(sresponse.status == true){
      debugger
      this.sharedService.setToken(sresponse.data.token);
      console.log(sresponse.data.token)
      this.toastr.success('Logged in  successfully','Success');
      this.router.navigate(['home']);      
    }
    
  }, error =>{
    this.toastr.error('Something went wrong','Try again');
  });

  }

}
