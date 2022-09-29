import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { requestResponseModel } from "../../models/response/request-response-model.interface";
import { RequestService } from "../../services/request/request.service";

@Component({
  selector: "pitz-list-request",
  templateUrl: "./list-request.component.html",
  styleUrls: ["./list-request.component.scss"],
})
export class ListRequestComponent implements OnInit {
  public listRequest$ = new BehaviorSubject<requestResponseModel[]>(null);

  constructor(private readonly requestService: RequestService) {}

  ngOnInit() {
    this.requestService.getRequest().subscribe((response) => {
      this.listRequest$.next(response.data);
    });
  }
}
