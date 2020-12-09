import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignUpComponent } from './core/pages/sign-up/sign-up.component';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'accsaber-frontend';

  links = [
    { linkName: 'Leaderboard', linkPath: '/leaderboard' },
    { linkName: 'Ranked Maps', linkPath: '/ranked-maps' },
    { linkName: 'Biweekly Challenge (soon)', linkPath: '/weekly-challenge', disable: true },
    { linkName: 'Staff Login (soon)', linkPath: '/staff-login', disable: true },
  ];
  isBeta: boolean;

  constructor(private dialog: MatDialog) {
    this.isBeta = environment.isBeta;
  }

  showSignupDialog(): void {
    const config: MatDialogConfig = {
      hasBackdrop: true,
      width: '500px',
    };
    this.dialog.open(SignUpComponent, config);
  }
}
