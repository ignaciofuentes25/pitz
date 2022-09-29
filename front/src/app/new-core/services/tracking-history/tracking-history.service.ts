import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TrackingHistoryService {
  private base = environment.apiURL;

  constructor(private _http: HttpClient) {}

  postTrackingHistoryMessage(trackingRequest?: any): Observable<any> {
    const url = `${this.base}/trackingHistory`;
    return this._http.put<any>(url, trackingRequest);
  }

  getTrackingHistory(sol_id: number): Observable<any> {
    const url = `${this.base}/trackingHistory?sol_id=${sol_id}`;
    return this._http.get<any>(url);
  }
}
