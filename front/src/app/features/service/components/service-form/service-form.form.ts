import { FormControl, FormGroup, Validators } from "@angular/forms";

export function ServiceForm(): FormGroup {
  return new FormGroup({
    service: new FormControl(null, Validators.required),
    description: new FormControl("", Validators.required),
  });
}
