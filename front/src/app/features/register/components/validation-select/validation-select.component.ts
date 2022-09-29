import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "pitz-validation-select",
  templateUrl: "./validation-select.component.html",
  styleUrls: ["./validation-select.component.scss"],
})
export class ValidationSelectComponent implements OnInit {
  @Output() changeStatus = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  changeStatusFunction() {
    this.changeStatus.emit(2);
  }
}
