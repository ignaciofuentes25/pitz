import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BrandService {
  private base = environment.apiURL;

  constructor(private _http: HttpClient) {}

  getBrands(): Observable<any> {
    const url = `${this.base}/brand`;
    return this._http.get<any>(url);
  }
}
