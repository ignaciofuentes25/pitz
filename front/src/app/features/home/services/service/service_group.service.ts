import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { ServiceGroupResponse } from "../../models/response/service-group-response.interface";

@Injectable({
  providedIn: "root",
})
export class ServiceGroupService {
  private base = environment.apiURL;

  constructor(private _http: HttpClient) {}

  getServiceGroup(): Observable<ServiceGroupResponse> {
    const url = `${this.base}/serviceGroup`;
    return this._http.get<ServiceGroupResponse>(url);
  }
}
