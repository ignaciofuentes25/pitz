import { FormControl, FormGroup, Validators } from "@angular/forms";

export function EmailForm(): FormGroup {
  return new FormGroup({
    email: new FormControl("", Validators.required),
  });
}
