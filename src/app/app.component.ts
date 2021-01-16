import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignUpComponent } from './core/components/sign-up/sign-up.component';
import { environment } from '../environments/environment';
import { getPlayerId, getPlayerName } from './shared/utlis/global-utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'accsaber-frontend';
  playerName: string;
  playerId: string;

  links = [
    { linkName: 'Leaderboard', linkPath: '/leaderboard' },
    { linkName: 'Ranked Maps', linkPath: '/ranked-maps' },
    { linkName: 'Biweekly Challenge (soon)', linkPath: '/weekly-challenge', disable: true },
    { linkName: 'Staff Login (soon)', linkPath: '/staff-login', last: true },
  ];
  isBeta: boolean;

  constructor(private dialog: MatDialog) {
    this.isBeta = environment.isBeta;

    this.playerName = getPlayerName();
    this.playerId = getPlayerId();
  }

  showSignupDialog(): void {
    const config: MatDialogConfig = {
      hasBackdrop: true,
      width: '500px',
    };
    this.dialog.open(SignUpComponent, config);
  }
}
