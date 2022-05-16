import { Component, OnInit } from '@angular/core';
import { SignUpService } from './sign-up.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { showError } from '../../../shared/utlis/snackbar-utils';
import { ScoreSaberPlayerInfo } from '../../../shared/model/scoresaber/score-saber-player-info';
import { HttpErrorResponse } from '@angular/common/http';
import { savePlayerToStorage } from '../../../shared/utlis/global-utils';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  scoreSaberLink: string;
  isLoading: boolean;

  playerInfo: ScoreSaberPlayerInfo;

  constructor(
    private signupService: SignUpService,
    private dialogRef: MatDialogRef<SignUpComponent>,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  checkPlayer(): void {
    this.isLoading = true;
    this.signupService.checkIfUserExists(this.scoreSaberLink).subscribe(
      (scoresaberData) => {
        this.playerInfo = scoresaberData.playerInfo;
        this.isLoading = false;
      },
      () => {
        showError(this.snackbar, 'User could not be found on Scoresaber');
        this.isLoading = false;
      }
    );
  }

  signupPlayer(): void {
    this.isLoading = true;
    this.signupService.signUpPlayer(this.playerInfo).subscribe(
      () => {
        savePlayerToStorage(this.playerInfo.playerName, this.playerInfo.playerId);
        window.location.reload();
      },
      (err: HttpErrorResponse) => {
        if (err.error.errorCode === '00001') {
          savePlayerToStorage(this.playerInfo.playerName, this.playerInfo.playerId);
          window.location.reload();
        }
      }
    );
  }
}
