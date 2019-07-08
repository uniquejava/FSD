import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class ReqInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const myreq = req.clone({
      url: environment.baseUrl + req.url,
      setParams: { ts: `${Date.now()}` },
    });
    return next.handle(myreq);
  }
}
