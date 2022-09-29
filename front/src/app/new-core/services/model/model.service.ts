import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ModelService {
  private base = environment.apiURL;

  constructor(private _http: HttpClient) {}

  getModels(mar_id: number): Observable<any> {
    const url = `${this.base}/model?mar_id=${mar_id}`;
    return this._http.get<any>(url);
  }
}
