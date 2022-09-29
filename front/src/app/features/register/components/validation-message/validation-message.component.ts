import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "pitz-validation-message",
  templateUrl: "./validation-message.component.html",
  styleUrls: ["./validation-message.component.scss"],
})
export class ValidationMessageComponent implements OnInit {
  @Output() changeStatus = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  changeStatusFunction() {
    this.changeStatus.emit(1);
  }
}
