import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { AuthenticationRequest } from "../../models/request/authentication-request.interface";
import { AuthenticationResponse } from "../../models/response/authentication-response.interface";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private base = environment.apiURL;

  constructor(private _http: HttpClient) {}

  authenticationUser(
    user: AuthenticationRequest
  ): Observable<AuthenticationResponse> {
    const url = `${this.base}/user/login?email=${user.email}&password=${user.password}`;
    return this._http.get<AuthenticationResponse>(url);
  }
}
