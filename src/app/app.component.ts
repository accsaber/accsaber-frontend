import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignUpComponent } from './core/components/sign-up/sign-up.component';
import { environment } from '../environments/environment';
import { getPlayerId, getPlayerName, getTheme, setTheme } from './shared/utlis/global-utils';
import { ScpmComponent } from './core/components/scpm/scpm.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'accsaber-frontend';
  playerName: string;
  playerId: string;

  imageUrl = environment.imageUrl;

  links = [
    { linkName: 'Leaderboard', linkPath: '/leaderboard' },
    { linkName: 'Ranked Maps', linkPath: '/ranked-maps' },
    // { linkName: 'Biweekly Challenge (soon)', linkPath: '/weekly-challenge', disable: true },
    // { linkName: 'Staff Login (soon)', linkPath: '/staff-login', last: true },
  ];
  isBeta: boolean;

  constructor(private dialog: MatDialog, private renderer: Renderer2) {
    this.isBeta = environment.isBeta;

    this.playerName = getPlayerName();
    this.playerId = getPlayerId();

    if (getTheme() === 'dark') {
      this.setDarkTheme();
    }
  }

  ngOnInit(): void {
    if (!localStorage.getItem('dontShowSCPM')) {
      this.dialog.open(ScpmComponent, { position: { top: '50px' }, maxWidth: '40%' });
    }
  }

  showSignupDialog(): void {
    const config: MatDialogConfig = {
      hasBackdrop: true,
      width: '500px',
    };
    this.dialog.open(SignUpComponent, config);
  }

  switchTheme(): void {
    if (getTheme() === 'light') {
      this.setDarkTheme();
      setTheme('dark');
    } else {
      this.setLightTheme();
      setTheme('light');
    }
  }

  setDarkTheme(): void {
    this.renderer.addClass(document.body, 'dark-theme');
    this.renderer.removeClass(document.body, 'light-theme');
  }

  setLightTheme(): void {
    this.renderer.removeClass(document.body, 'dark-theme');
    this.renderer.addClass(document.body, 'light-theme');
  }
}
