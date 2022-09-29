import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";

export function RequestForm(): FormGroup {
  return new FormGroup({
    proposal: new FormControl("", Validators.required),
    payment: new FormControl(0, [Validators.required, positiveNumbers]),
    payment_method: new FormControl(1, Validators.required),
    state: new FormControl(0),
    mark: new FormControl(null),
    model: new FormControl(null),
    patent: new FormControl(null),
    year: new FormControl(null),
    vin: new FormControl(null),
    address: new FormControl(null),
    address_number: new FormControl(""),
    commune: new FormControl(0),
    status: new FormControl("", Validators.required),
  });
}

const positiveNumbers: ValidatorFn = (control: FormControl) => {
  if (Number(control.value) < 0) {
    return { nonZero: true };
  } else {
    return null;
  }
};
