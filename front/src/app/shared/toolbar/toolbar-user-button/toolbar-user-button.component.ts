import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { StorageService } from "src/app/new-core/services/storage/storage.service";

@Component({
  selector: "pitz-toolbar-user-button",
  templateUrl: "./toolbar-user-button.component.html",
  styleUrls: ["./toolbar-user-button.component.scss"],
})
export class ToolbarUserButtonComponent implements OnInit, AfterViewInit {
  isOpen: boolean;
  public user: any = { name: "", email: "" };
  public pitzerUser = false;
  public clientUser = false;

  constructor(
    private storageService: StorageService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    if (
      localStorage.getItem("user") !== undefined &&
      localStorage.getItem("user") !== null
    ) {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.clientUser = true;
    }

    if (
      localStorage.getItem("auth") !== undefined &&
      localStorage.getItem("auth") !== null
    ) {
      this.user = JSON.parse(localStorage.getItem("auth"));
      this.pitzerUser = true;
    }
  }

  ngAfterViewInit() {}

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }

  logoutHandler() {
    this.storageService.logout();
    this.router.navigate(["/"]);
  }
}
