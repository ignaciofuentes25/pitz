import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class SnackBarService {
  constructor(private readonly _snackBar: MatSnackBar) {}

  snackBarSuccess(message) {
    this._snackBar.open(message, "", {
      duration: 3000,
      panelClass: ["my-snack-bar-success"],
    });
  }

  snackBarError(message) {
    this._snackBar.open(message, "", {
      duration: 3000,
      panelClass: ["my-snack-bar-error"],
    });
  }

  snackBarWarning(message) {
    this._snackBar.open(message, "", {
      duration: 3000,
      panelClass: ["my-snack-bar-warning"],
    });
  }
}
