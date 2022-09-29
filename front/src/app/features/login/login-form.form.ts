import { FormControl, FormGroup, Validators } from "@angular/forms";

export function loginForm(): FormGroup {
  return new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });
}
