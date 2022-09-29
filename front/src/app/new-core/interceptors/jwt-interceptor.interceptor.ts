import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let req = request;
    const token: string =
      localStorage.getItem("access_token") ||
      localStorage.getItem("access_token_auth");

    if (token) {
      req = request.clone({
        headers: req.headers.append("Authorization", `Bearer ${token}`),
      });
    }

    return next.handle(req);
  }
}
