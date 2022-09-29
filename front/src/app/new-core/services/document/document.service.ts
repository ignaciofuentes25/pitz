import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DocumentService {
  private base = environment.apiURL;

  constructor(private _http: HttpClient) {}

  getDocuments(sol_id: number): Observable<any> {
    const url = `${this.base}/document?sol_id=${sol_id}`;
    return this._http.get<any>(url);
  }

  getDocumentById(doc_id: number): Observable<any> {
    const url = `${this.base}/document/documentId?doc_id=${doc_id}`;
    return this._http.get<any>(url);
  }

  postDocument(document: any): Observable<any> {
    const url = `${this.base}/document`;
    return this._http.post<any>(url, document);
  }

  removeDocument(doc_id: number): Observable<any> {
    const url = `${this.base}/document?doc_id=${doc_id}`;
    return this._http.delete<any>(url);
  }
}
