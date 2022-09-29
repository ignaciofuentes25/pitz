import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { StorageService } from "src/app/new-core/services/storage/storage.service";
import { ServiceGroupModel } from "./models/service-group.interface";
import { ServiceGroupService } from "./services/service/service_group.service";

@Component({
  selector: "pitz-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  public groupServices: ServiceGroupModel;

  constructor(
    private readonly serviceGroupService: ServiceGroupService,
    private readonly router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    if (
      localStorage.getItem("auth") !== undefined &&
      localStorage.getItem("auth") !== null
    ) {
      this.storageService.logout();
    }

    this.serviceGroupService.getServiceGroup().subscribe((response) => {
      this.groupServices = response.data;
    });
  }

  routerLinkFunction(group) {
    this.router.navigate([`./${group.seR_AGRUP_ID}/service/`]);
  }
}
