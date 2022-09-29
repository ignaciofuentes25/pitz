import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { StorageService } from "src/app/new-core/services/storage/storage.service";

@Component({
  selector: "pitz-request",
  templateUrl: "./request.component.html",
  styleUrls: ["./request.component.scss"],
})
export class RequestComponent implements OnInit {
  constructor(
    private readonly router: Router,
    public readonly storageService: StorageService
  ) {}

  ngOnInit() {
    if (
      localStorage.getItem("user") !== null &&
      localStorage.getItem("access_token") !== null &&
      localStorage.getItem("service_route") !== null
    ) {
      this.router.navigate([localStorage.getItem("service_route")]);
      this.storageService.removeItem("service_route");
    }
  }
}
