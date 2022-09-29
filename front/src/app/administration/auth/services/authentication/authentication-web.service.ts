import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { AuthenticationRequest } from "src/app/features/login/models/request/authentication-request.interface";
import { AuthenticationWebResponse } from "../../models/response/authentication-web-response.interface";

@Injectable({
  providedIn: "root",
})
export class AuthenticationWebService {
  private base = environment.apiURL;

  constructor(private _http: HttpClient) {}

  authenticationWebUser(
    user: AuthenticationRequest
  ): Observable<AuthenticationWebResponse> {
    const url = `${this.base}/userweb/login?email=${user.email}&password=${user.password}`;
    return this._http.get<AuthenticationWebResponse>(url);
  }
}
