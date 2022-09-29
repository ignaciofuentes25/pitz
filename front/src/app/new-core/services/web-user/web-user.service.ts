import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserWebService {
  private base = environment.apiURL;

  constructor(private _http: HttpClient) {}

  getWebUser(): Observable<any> {
    const url = `${this.base}/userweb`;
    return this._http.get<any>(url);
  }

  postWebUser(userWeb: any): Observable<any> {
    const url = `${this.base}/userweb/register`;
    return this._http.put<any>(url, userWeb);
  }

  getWebUserById(userId: number): Observable<any> {
    const url = `${this.base}/userweb?usw_id=${userId}`;
    return this._http.get<any>(url);
  }
}
