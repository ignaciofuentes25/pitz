import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "pitz-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
  public user: any = { name: "", email: "" };
  constructor(private readonly router: Router) {}

  ngOnInit() {
    if (
      localStorage.getItem("user") !== undefined &&
      localStorage.getItem("user") !== null
    ) {
      this.user = JSON.parse(localStorage.getItem("user"));
    } else {
      this.router.navigate(["/login"]);
    }
  }
}
