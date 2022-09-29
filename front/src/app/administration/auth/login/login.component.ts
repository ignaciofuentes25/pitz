import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { AuthenticationRequest } from "src/app/features/login/models/request/authentication-request.interface";
import { SnackBarService } from "src/app/new-core/services/snack-bar/snack-bar.service";
import { StorageService } from "src/app/new-core/services/storage/storage.service";
import { ROUTE_TRANSITION } from "../../../app.animation";
import { AuthenticationWebService } from "../services/authentication/authentication-web.service";
import { loginForm } from "./login-form.form";

@Component({
  selector: "pitz-adm-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  animations: [...ROUTE_TRANSITION],
  host: { "[@routeTransition]": "" },
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  public loginForm: FormGroup = loginForm();
  public loading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private storageService: StorageService,
    private readonly authenticationUser: AuthenticationWebService,
    private readonly snackBarService: SnackBarService
  ) {}

  ngOnInit() {
    if (
      localStorage.getItem("auth") !== undefined &&
      localStorage.getItem("auth") !== null
    ) {
      this.router.navigate(["/auth/dashboard"]);
    }
  }

  login() {
    this.loginForm.markAllAsTouched();

    if (
      this.loginForm.value.email !== "" &&
      this.loginForm.value.password !== ""
    ) {
      this.loading$.next(true);
      let authentication: AuthenticationRequest = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      this.authenticationUser
        .authenticationWebUser(authentication)
        .subscribe((response) => {
          if (response.data !== null) {
            var user: any = response.data;
            this.storageService.setItem("auth", JSON.stringify(user));
            this.storageService.setItem(
              "access_token_auth",
              response.access_Token
            );
            this.snackBarService.snackBarSuccess("Inicio de sesión correcto.");
            this.router.navigate(["/auth/dashboard"]);
          } else {
            this.snackBarService.snackBarError(
              "Usuario o Contraseña incorrectos."
            );
            this.loading$.next(false);
          }
        }),
        (error) => {
          this.snackBarService.snackBarError(error.message);
          this.loading$.next(false);
        },
        () => {
          this.loading$.next(false);
        };
    }
  }
}
