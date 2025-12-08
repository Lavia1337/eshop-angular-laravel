import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { HttpHandler } from '@angular/common/http'
import { HttpEvent } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class AppInterceptor implements HttpInterceptor {

  baseURL = 'http://localhost:8000/api'

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request.clone({
      url: this.baseURL + request.url,
    }))
  }
}