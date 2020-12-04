import { Component, OnInit } from '@angular/core';
import { SignUpService } from './sign-up.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { showError } from '../../../shared/utlis/snackbar-utils';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  isLoading: boolean;
  playerName: string;
  constructor(
    private signupService: SignUpService,
    private dialogRef: MatDialogRef<SignUpComponent>,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  signUpPlayer(): void {
    this.isLoading = true;
    this.signupService.checkIfUserExists(this.playerName).subscribe(
      () => {
        this.signupService.signUpPlayer(this.playerName).subscribe(
          () => this.dialogRef.close(),
          () => (this.isLoading = false)
        );
      },
      () => {
        showError(this.snackbar, 'User could not be found on Scoresaber');
        this.isLoading = false;
      }
    );
  }
}
