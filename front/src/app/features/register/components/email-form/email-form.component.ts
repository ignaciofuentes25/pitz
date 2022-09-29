import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { SnackBarService } from "src/app/new-core/services/snack-bar/snack-bar.service";
import { RegisterCodeRequest } from "../../models/request/register-code-request.interface";
import { RegisterService } from "../../services/register/register.service";
import { EmailForm } from "./email-form.form";

@Component({
  selector: "pitz-email-form",
  templateUrl: "./email-form.component.html",
  styleUrls: ["./email-form.component.scss"],
})
export class EmailFormComponent implements OnInit {
  public emailForm: FormGroup = EmailForm();
  public loading$ = new BehaviorSubject<boolean>(false);

  @Output() changeEmailStatus = new EventEmitter<any>();

  constructor(
    private readonly registerService: RegisterService,
    private readonly snackBarService: SnackBarService
  ) {}

  ngOnInit() {}

  sendEmailFuntion() {
    this.emailForm.markAllAsTouched();
    if (this.emailForm.value.email !== "") {
      this.loading$.next(true);
      const register: RegisterCodeRequest = {
        email: this.emailForm.value.email,
      };
      this.registerService.postCodeRegister(register).subscribe(
        (response) => {
          if (response.success) {
            this.changeStatusFunction(response.data);
            this.snackBarService.snackBarSuccess(
              "Se ha enviado un correo electronico con el código."
            );
          } else {
            this.loading$.next(false);
          }
        },
        (error) => {
          this.snackBarService.snackBarError(error.message);
          this.loading$.next(false);
        },
        () => {
          this.loading$.next(false);
        }
      );
    }
  }

  changeStatusFunction(user: any) {
    this.changeEmailStatus.emit(user);
  }
}
