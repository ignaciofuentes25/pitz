import { FormControl, FormGroup, Validators } from "@angular/forms";

export function RegisterForm(): FormGroup {
  return new FormGroup({
    name: new FormControl("", [
      Validators.required,
      Validators.maxLength(30),
      Validators.minLength(1),
      noWhitespaceValidator,
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.maxLength(30),
      Validators.minLength(1),
    ]),
    repeat_password: new FormControl("", Validators.required),
    phone_number: new FormControl("", [
      Validators.required,
      Validators.maxLength(15),
      Validators.minLength(8),
    ]),
    terms: new FormControl(true, Validators.required),
    offer: new FormControl(true),
  });
}

export function noWhitespaceValidator(control: FormControl) {
  const isSpace = (control.value || "").match(/\s/g);
  return isSpace ? { whitespace: true } : null;
}
