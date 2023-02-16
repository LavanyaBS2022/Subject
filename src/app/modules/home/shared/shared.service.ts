import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private token;
  constructor() { }

  public setToken(token){
    this.token=token;
    sessionStorage.setItem("token",token);
  }

  public getToken(){
    if(this.token){
      return this.token;
    }else{
      return sessionStorage.getItem("token")
    }
  }
}
