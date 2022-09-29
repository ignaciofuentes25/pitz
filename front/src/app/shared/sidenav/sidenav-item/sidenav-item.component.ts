import { Component, Input, OnInit } from "@angular/core";
import { SidenavItem } from "./sidenav-item.model";
import * as fromRoot from "../../../reducers/index";
import * as sidenavAction from "../shared/sidenav.action";
import { Store } from "@ngrx/store";
import { StorageService } from "src/app/new-core/services/storage/storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "elastic-sidenav-item",
  templateUrl: "./sidenav-item.component.html",
  styleUrls: ["./sidenav-item.component.scss"],
})
export class SidenavItemComponent implements OnInit {
  scrollbar: any;
  login: boolean = false;

  @Input("item") item: SidenavItem;
  @Input("currentlyOpen") currentlyOpen: SidenavItem[] = [];

  constructor(
    private store: Store<fromRoot.State>,
    private storageService: StorageService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    if (
      localStorage.getItem("user") !== undefined &&
      localStorage.getItem("user") !== null
    ) {
      this.login = true;
    }
  }

  toggleDropdown() {
    if (this.item.hasSubItems()) {
      this.store.dispatch(
        new sidenavAction.ToggleOpenSidenavItemAction(this.item)
      );
    }
  }

  isOpen(item: SidenavItem) {
    return this.currentlyOpen.indexOf(item) > -1;
  }

  // Receives the count of Sub Items and multiplies it with 48 (height of one SidenavItem) to set the height for animation.
  getSubMenuHeight(): string {
    return this.getSubMenuItemsCount(this.item) * 48 + "px";
  }

  // Counts the amount of Sub Items there is and returns the count.
  getSubMenuItemsCount(item: SidenavItem): number {
    let count = 0;

    if (item.hasSubItems() && this.isOpen(item)) {
      count += item.subItems.length;

      item.subItems.forEach((subItem) => {
        count += this.getSubMenuItemsCount(subItem);
      });
    }

    return count;
  }

  logoutHandler() {
    this.storageService.logout();
    this.router.navigate(["/"]);
  }
}
