import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { RegisterCodeRequest } from "../../models/request/register-code-request.interface";
import { RegisterCodeResponse } from "../../models/response/register-code-response.interface";
import { RegisterUserRequest } from "../../models/request/register-user-request.interface";
import { VerifyCodeResponse } from "../../models/response/verify-code-response.interface";

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  private base = environment.apiURL;

  constructor(private _http: HttpClient) {}

  postCodeRegister(
    email: RegisterCodeRequest
  ): Observable<RegisterCodeResponse> {
    const url = `${this.base}/user/generateCode`;
    return this._http.post<RegisterCodeResponse>(url, email);
  }

  putUserRegister(userData: RegisterUserRequest): Observable<any> {
    const url = `${this.base}/user/register`;
    return this._http.put<any>(url, userData);
  }

  getVerifyCode(email: string, code: string): Observable<VerifyCodeResponse> {
    const url = `${this.base}/user/verifyCode?email=${email}&code=${code}`;
    return this._http.get<VerifyCodeResponse>(url);
  }
}
