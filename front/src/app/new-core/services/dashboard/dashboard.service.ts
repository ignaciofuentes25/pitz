import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  private base = environment.apiURL;

  constructor(private _http: HttpClient) {}

  getViewSolCount(): Observable<any> {
    const url = `${this.base}/dashboard/countSolStatus`;
    return this._http.get<any>(url);
  }
}
