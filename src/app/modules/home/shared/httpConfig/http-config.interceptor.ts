import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from '../shared.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService , private sharedService:SharedService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let token = this.sharedService.getToken();
    if(token){     
      request = request.clone({ setHeaders : {'Authorization':'Bearer '+token} })
    }
    this.spinner.show();
    return next.handle(request).pipe(catchError((error)=>{
      return throwError(()=>error);
    }),finalize(()=>{
      this.spinner.hide();
    }));
  }
}
