import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SnackBarService } from "src/app/new-core/services/snack-bar/snack-bar.service";
import { UserWebService } from "src/app/new-core/services/web-user/web-user.service";
// import { Router } from "@angular/router";
import { PitzerForm } from "./pitzer-form.form";

@Component({
  selector: "pitz-pitzer-form",
  templateUrl: "./pitzer-form.component.html",
  styleUrls: ["./pitzer-form.component.scss"],
})
export class PitzerFormComponent implements OnInit {
  public pitzerForm: FormGroup = PitzerForm();
  public state = 0;
  public userId = 0;

  constructor(
    private router: Router,
    private readonly snackBarService: SnackBarService,
    private readonly userWebService: UserWebService,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (params.userId) {
        this.userId = params.userId;
        this.state = 1;

        this.userWebService
          .getWebUserById(Number(this.userId))
          .subscribe((response) => {
            this.pitzerForm.controls["name"].setValue(
              response.data[0].usW_NOMBRE
            );
            this.pitzerForm.controls["email"].setValue(
              response.data[0].usW_EMAIL
            );
            this.pitzerForm.controls["rol"].setValue(
              Number(response.data[0].usW_TIPO)
            );
          });
      }
    });
  }

  registerUserWebFunction() {
    Number(this.userId);
    this.pitzerForm.markAllAsTouched();
    if (
      this.pitzerForm.value.name.trimStart() !== "" &&
      this.pitzerForm.value.email.trimStart() !== "" &&
      this.pitzerForm.value.password.trimStart() !== ""
    ) {
      this.createUserWeb();
    }
  }

  createUserWeb() {
    const user = this.userWeb();
    this.userWebService.postWebUser(user).subscribe(
      (response: any) => {
        if (response.data) {
          this.snackBarService.snackBarSuccess(
            Number(this.userId) === 0
              ? "Usuario creado correctamente."
              : "Usuario editado correctamente."
          );
          this.router.navigate(["/auth/dashboard/user"]).then(() => {
            window.location.reload();
          });
        } else {
          this.snackBarService.snackBarError(
            Number(this.userId) === 0
              ? "Error crear el usuario."
              : "Error editar el usuario."
          );
        }
      },
      (err) => {
        this.snackBarService.snackBarError(err.message);
      }
    );
  }

  userWeb() {
    let user;
    if (Number(this.userId) === 0) {
      user = {
        email: this.pitzerForm.value.email,
        name: this.pitzerForm.value.name,
        password: this.pitzerForm.value.password,
        tipe: this.pitzerForm.value.rol.toString(),
      };
    } else {
      user = {
        usw_id: Number(this.userId),
        email: this.pitzerForm.value.email,
        name: this.pitzerForm.value.name,
        password: this.pitzerForm.value.password,
        tipe: this.pitzerForm.value.rol.toString(),
      };
    }

    return user;
  }
}
