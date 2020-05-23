import {Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    if (authToken != null) {
      req = req.clone({
        setHeaders: {
          Authorization: "Bearer " + authToken
        }
      });
    }
    const baseUrl = document.getElementsByTagName('base')[0].href;
    const apiReq = req.clone({ url: `${baseUrl}${req.url}` });
    return next.handle(req);
  }
}
