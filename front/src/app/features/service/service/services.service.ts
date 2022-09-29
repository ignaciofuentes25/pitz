import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { ServiceResponse } from "../models/response/service-response.interface";
import { ServiceRequest } from "../models/request/service-request.interface";

@Injectable({
  providedIn: "root",
})
export class ServicesService {
  private base = environment.apiURL;

  constructor(private _http: HttpClient) {}

  getServices(service_id: number): Observable<ServiceResponse> {
    let url;
    url =
      service_id !== null
        ? `${this.base}/service?group_id=${service_id}`
        : `${this.base}/service`;
    return this._http.get<ServiceResponse>(url);
  }

  setService(serviceRequest: ServiceRequest): Observable<ServiceResponse> {
    const url = `${this.base}/request`;
    return this._http.post<ServiceResponse>(url, serviceRequest);
  }
}
