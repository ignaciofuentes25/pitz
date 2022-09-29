import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { SnackBarService } from "../../services/snack-bar/snack-bar.service";
import { StorageService } from "../../services/storage/storage.service";

@Injectable({
  providedIn: "root",
})
export class PageRestrictionGuard implements CanActivate {
  constructor(
    private readonly snackBarService: SnackBarService,
    private readonly router: Router,
    public readonly storageService: StorageService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    next;
    if (
      localStorage.getItem("user") === null ||
      localStorage.getItem("access_token") === null
    ) {
      if (
        localStorage.getItem("auth") === null ||
        localStorage.getItem("access_token_auth") === null
      ) {
        this.snackBarService.snackBarWarning("Se requiere inicio de sesión.");
        this.storageService.setItem("service_route", state.url);

        this.router.navigate(["/login"]);
      }
    }

    return true;
  }
}
