import { Component, OnInit } from "@angular/core";

@Component({
  selector: "pitz-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  status: number = 0;
  public user: any;

  constructor() {}

  ngOnInit() {}

  changeEstatusEvent(newStatus: number) {
    this.status = newStatus;
  }

  changeEstatusEmailEvent(response: any) {
    this.user = response;
    this.status = 3;
  }
}
