import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  products: any = [];
  private ROOT_URL = environment.base_url;
  constructor(private http: HttpClient,private spinner:NgxSpinnerService) {}

  postRequest(url: string, body={}): Observable<any> {
    return this.http.post(`${this.ROOT_URL}${url}`, body);
  }
  getRequest(url: string): Observable<any> {
    return this.http.get(`${this.ROOT_URL}${url}`).pipe(
        map((response:any)=>{
          let products=[];
          for(let key in response){
            response[key].id=key;
            products.push(response[key])
          }
          return products;
    }));
  }
  
  getProductById(url: string,id:number): Observable<any> {
    return this.http.get(`${this.ROOT_URL}${url}/${id}.json`);
  }
   putRequest(url: string,id:number, body={}): Observable<any> {
    return this.http.put(`${this.ROOT_URL}${url}/${id}.json`, body);
  }
  deleteRequest(url: string,id:number): Observable<any> {
    return this.http.delete(`${this.ROOT_URL}${url}/${id}.json`);
  }

}
