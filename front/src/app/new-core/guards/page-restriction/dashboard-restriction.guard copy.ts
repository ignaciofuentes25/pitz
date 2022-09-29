import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { SnackBarService } from "../../services/snack-bar/snack-bar.service";
import { StorageService } from "../../services/storage/storage.service";

@Injectable({
  providedIn: "root",
})
export class DashboardRestrictionGuard implements CanActivate {
  constructor(
    private readonly snackBarService: SnackBarService,
    private readonly router: Router,
    public readonly storageService: StorageService
  ) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      localStorage.getItem("auth") === null ||
      localStorage.getItem("access_token_auth") === null
    ) {
      this.snackBarService.snackBarWarning("Se requiere inicio de sesión.");

      this.router.navigate(["/auth/login"]);
    }

    return true;
  }
}
