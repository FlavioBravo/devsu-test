import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const newHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      authorId: '71330830',
    });
    if (request.method === 'GET' && request.url.includes('?id=')) {
      return next.handle(request);
    }
    //clone request and change header
    let clone = request.clone({ headers: newHeaders });
    return next.handle(clone);
  }
}
