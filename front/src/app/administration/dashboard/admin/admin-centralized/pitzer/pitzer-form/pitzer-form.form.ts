import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";

export function PitzerForm(): FormGroup {
  return new FormGroup({
    name: new FormControl("", [Validators.required, trimValidator]),
    email: new FormControl("", [Validators.required, trimValidator]),
    password: new FormControl("", [Validators.required, trimValidator]),
    rol: new FormControl(1, Validators.required),
  });
}

const trimValidator: ValidatorFn = (control: FormControl) => {
  if (control.value.startsWith(" ")) {
    return {
      trimError: { value: "control has leading whitespace" },
    };
  }
  if (control.value.endsWith(" ")) {
    return {
      trimError: { value: "control has trailing whitespace" },
    };
  }

  return null;
};
