import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { SnackBarService } from "src/app/new-core/services/snack-bar/snack-bar.service";
import { RegisterUserRequest } from "../../models/request/register-user-request.interface";
import { RegisterService } from "../../services/register/register.service";
import { RegisterForm } from "./register-form.form";

@Component({
  selector: "pitz-register-form",
  templateUrl: "./register-form.component.html",
  styleUrls: ["./register-form.component.scss"],
})
export class RegisterFormComponent implements OnInit {
  @Input() user;

  public registerForm: FormGroup = RegisterForm();

  public loading$ = new BehaviorSubject<boolean>(false);
  public errorMessage = "";

  constructor(
    private readonly router: Router,
    private readonly registerService: RegisterService,
    private readonly snackBarService: SnackBarService
  ) {}

  ngOnInit() {}

  registerFunction() {
    this.registerForm.markAllAsTouched();
    if (
      this.registerForm.value.name !== "" &&
      this.registerForm.value.password !== "" &&
      this.registerForm.value.repeat_password !== "" &&
      this.registerForm.value.phone_number !== "" &&
      this.registerForm.value.terms !== "" &&
      this.registerForm.value.password ===
        this.registerForm.value.repeat_password
    ) {
      this.loading$.next(true);
      const user: RegisterUserRequest = {
        email: this.user.usU_EMAIL,
        name: this.registerForm.value.name,
        password: this.registerForm.value.password,
        phone: this.registerForm.value.phone_number,
      };
      this.registerService.putUserRegister(user).subscribe(
        () => {
          this.snackBarService.snackBarSuccess(
            "Información guardada correctamente."
          );
          this.router.navigate(["/login"]);
        },
        (error) => {
          this.snackBarService.snackBarError(error.message);
          this.loading$.next(false);
        },
        () => {
          this.loading$.next(false);
        }
      );
    } else {
      if (
        this.registerForm.value.password !==
        this.registerForm.value.repeat_password
      ) {
        this.errorMessage = "Las contraseñas no coinciden.";
      } else {
        this.errorMessage = "";
      }
    }
  }
}
