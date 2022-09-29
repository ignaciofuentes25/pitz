import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { RequestResponse } from "../../models/request-response.interface";
import { ChatRequest } from "../../models/request/chat-request.interface";

@Injectable({
  providedIn: "root",
})
export class RequestService {
  private base = environment.apiURL;

  constructor(private _http: HttpClient) {}

  getRequest(sol_id?: number): Observable<RequestResponse> {
    const url =
      sol_id === undefined
        ? `${this.base}/request`
        : `${this.base}/request?sol_id=${sol_id}`;
    return this._http.get<RequestResponse>(url);
  }

  getRequestFiltered(
    status: string,
    usw_id?: number
  ): Observable<RequestResponse> {
    const url =
      usw_id === undefined
        ? `${this.base}/request/filtered?status=${status}`
        : `${this.base}/request/filtered?status=${status}&usw_id=${usw_id}`;
    return this._http.get<RequestResponse>(url);
  }

  getChat(sol_id?: number): Observable<any> {
    const url = `${this.base}/chat?sol_id=${sol_id}`;
    return this._http.get<any>(url);
  }

  getVehicle(usu_id: number): Observable<any> {
    const url = `${this.base}/vehicle?usu_id=${usu_id}`;
    return this._http.get<any>(url);
  }

  postChatMessage(chatRequest?: ChatRequest): Observable<any> {
    const url = `${this.base}/chat`;
    return this._http.post<any>(url, chatRequest);
  }

  postAttendRequest(sol_id: number): Observable<any> {
    const url = `${this.base}/request/attend?sol_id=${sol_id}`;
    return this._http.post<any>(url, null);
  }

  postProposalRequest(proposal: any): Observable<any> {
    const url = `${this.base}/request/proposal`;
    return this._http.post<any>(url, proposal);
  }

  putVehicle(vehicleInfo: any): Observable<any> {
    const url = `${this.base}/vehicle`;
    return this._http.put<any>(url, vehicleInfo);
  }
}
