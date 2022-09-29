import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { SnackBarService } from "src/app/new-core/services/snack-bar/snack-bar.service";
import { RegisterCodeRequest } from "../../models/request/register-code-request.interface";
import { RegisterService } from "../../services/register/register.service";
import { ConfirmationForm } from "./confirmation-form.form";

@Component({
  selector: "pitz-email-message",
  templateUrl: "./email-message.component.html",
  styleUrls: ["./email-message.component.scss"],
})
export class EmailMessageComponent implements OnInit {
  @Output() changeStatus = new EventEmitter<any>();
  @Input() user;

  code: string;
  public errorCode$ = new BehaviorSubject<boolean>(false);
  public loading$ = new BehaviorSubject<boolean>(false);
  public loadingResend$ = new BehaviorSubject<boolean>(false);

  public confirmationForm: FormGroup = ConfirmationForm();

  constructor(
    private readonly registerService: RegisterService,
    private readonly snackBarService: SnackBarService
  ) {}

  ngOnInit() {}

  verifyCodeFunction() {
    this.errorCode$.next(false);
    this.confirmationForm.markAllAsTouched();
    if (this.confirmationForm.value.code !== "") {
      this.loading$.next(true);
      const code = this.confirmationForm.value.code.replace("Pitz - ", "");
      this.registerService.getVerifyCode(this.user.usU_EMAIL, code).subscribe(
        (response) => {
          if (response.data) {
            this.changeStatusFunction();
            this.snackBarService.snackBarSuccess("Codigo correcto.");
          } else {
            this.errorCode$.next(true);
            this.snackBarService.snackBarError(
              "El código ingresado no es correcto."
            );
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

  resendCodeFunction() {
    this.loadingResend$.next(true);
    const register: RegisterCodeRequest = {
      email: this.user.usU_EMAIL,
    };

    this.registerService.postCodeRegister(register).subscribe(
      (response) => {
        if (response.success) {
          this.user = response.data;
          this.snackBarService.snackBarSuccess(
            "Se ha enviado un correo electronico con el código."
          );
        }
      },
      (error) => {
        this.snackBarService.snackBarError(error.message);
        this.loading$.next(false);
      },
      () => {
        this.loadingResend$.next(false);
      }
    );
  }

  changeStatusFunction() {
    this.changeStatus.emit(4);
  }
}
