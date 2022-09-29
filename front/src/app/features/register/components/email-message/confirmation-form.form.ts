import { FormControl, FormGroup, Validators } from "@angular/forms";

export function ConfirmationForm(): FormGroup {
  return new FormGroup({
    code: new FormControl("", Validators.required),
  });
}
