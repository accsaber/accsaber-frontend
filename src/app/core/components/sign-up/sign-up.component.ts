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
  selectedHmd: string;
  isLoading: boolean;

  playerInfo: ScoreSaberPlayerInfo;
  hmds = [
    'Valve Index',
    'Oculus CV1',
    'Oculus Quest',
    'Oculus Quest 2',
    'Oculus Rift S',
    'HTC Vive (Pro)',
    'HTC Vive (Pro) | Index Controllers',
  ];

  constructor(
    private signupService: SignUpService,
    private dialogRef: MatDialogRef<SignUpComponent>,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  checkPlayer(): void {
    this.isLoading = true;
    this.signupService.checkIfUserExists(this.scoreSaberLink).subscribe(
      (f) => {
        this.playerInfo = f.playerInfo;
        console.log(f);
        this.isLoading = false;
      },
      () => {
        showError(this.snackbar, 'User could not be found on Scoresaber');
        this.isLoading = false;
      }
    );
  }

  signupPlayer(): void {
    this.signupService.signUpPlayer(this.playerInfo, this.selectedHmd).subscribe(
      () => {
        savePlayerToStorage(this.playerInfo.playerName, this.playerInfo.playerId);
        window.location.reload();
      },
      (err: HttpErrorResponse) => {
        this.isLoading = false;
        if (err.error.errorCode === '00001') {
          savePlayerToStorage(this.playerInfo.playerName, this.playerInfo.playerId);
          window.location.reload();
        }
      }
    );
  }
}
