import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "pitz-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
})
export class ToolbarComponent implements OnInit {
  public localDate = new Date();
  @Output() toggledSidenav = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  toggleSidenav() {
    this.toggledSidenav.emit();
  }
}
