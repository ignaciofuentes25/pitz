import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { NavigationEnd, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromRoot from "../../../reducers/index";
import { SidenavItem } from "../../sidenav/sidenav-item/sidenav-item.model";
import { SetCurrentlyOpenByRouteAction } from "../../sidenav/shared/sidenav.action";
import { StorageService } from "src/app/new-core/services/storage/storage.service";

@Component({
  selector: "pitz-toolbar-navigation",
  templateUrl: "./toolbar-navigation.component.html",
  styleUrls: ["./toolbar-navigation.component.scss"],
})
export class ToolbarNavigationComponent implements OnInit, OnDestroy {
  @Input() auth: boolean = false;
  @Input() client: boolean = false;

  sidenavItems$: Observable<SidenavItem[]>;
  currentlyOpen$: Observable<SidenavItem[]>;
  showMoreButtonAfterIndex = 8;
  public user: any = null;

  private _routerEventsSubscription: Subscription;

  constructor(
    private readonly router: Router,
    private readonly store: Store<fromRoot.State>,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.getUser();

    this.storageService.watchStorage().subscribe(() => {
      this.getUser();
    });

    this.sidenavItems$ = this.store.select(fromRoot.getSidenavItems);
    this.currentlyOpen$ = this.store.select(fromRoot.getSidenavCurrentlyOpen);

    this._routerEventsSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.store.dispatch(
          new SetCurrentlyOpenByRouteAction(event.urlAfterRedirects)
        );
      }
    });
  }

  ngOnDestroy() {
    this._routerEventsSubscription.unsubscribe();
  }

  getUser() {
    if (
      localStorage.getItem("user") !== undefined &&
      localStorage.getItem("user") !== null
    ) {
      this.user = JSON.parse(localStorage.getItem("user"));
    } else {
      this.user = null;
      this.router.navigate([this.router.url]);
    }

    if (
      localStorage.getItem("auth") !== undefined &&
      localStorage.getItem("auth") !== null
    ) {
      this.user = JSON.parse(localStorage.getItem("auth"));
    }
  }
}
