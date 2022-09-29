import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { SnackBarService } from "src/app/new-core/services/snack-bar/snack-bar.service";
import { StorageService } from "src/app/new-core/services/storage/storage.service";
import { loginForm } from "./login-form.form";
import { AuthenticationRequest } from "./models/request/authentication-request.interface";
import { AuthenticationService } from "./services/authentication/authentication.service";

@Component({
  selector: "pitz-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = loginForm();
  public loading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly router: Router,
    private readonly authenticationUser: AuthenticationService,
    public readonly storageService: StorageService,
    private readonly snackBarService: SnackBarService
  ) {}

  ngOnInit() {
    if (
      localStorage.getItem("user") !== undefined &&
      localStorage.getItem("user") !== null
    ) {
      this.router.navigate(["/request"]);
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
        .authenticationUser(authentication)
        .subscribe((response) => {
          if (response.data !== null) {
            var user: any = response.data;
            this.storageService.setItem("user", JSON.stringify(user));
            this.storageService.setItem("access_token", response.access_Token);
            this.snackBarService.snackBarSuccess("Inicio de sesión correcto.");
            this.router.navigate(["/request"]);
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

  createAccount() {
    this.router.navigate(["/register"]);
  }
}
