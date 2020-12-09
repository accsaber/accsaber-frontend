import { MatSnackBar } from '@angular/material/snack-bar';

export function showInfo(snackbar: MatSnackBar, message: string): void {
  snackbar.open(message, null, { panelClass: 'info' });
}

export function showWarn(snackbar: MatSnackBar, message: string): void {
  snackbar.open(message, null, { panelClass: 'warn' });
}

export function showError(snackbar: MatSnackBar, message: string): void {
  snackbar.open(message, null, { panelClass: 'error' });
}
