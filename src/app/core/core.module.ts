import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { AgGridModule } from 'ag-grid-angular';
import { RankedMapsComponent } from './pages/ranked-maps/ranked-maps.component';
import { BiWeeklyChallengeComponent } from './pages/weekly-challenge/bi-weekly-challenge.component';
import { StaffLoginComponent } from './pages/staff-login/staff-login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MapLeaderboardComponent } from './pages/map-leaderboard/map-leaderboard.component';
import { GridButtonComponent } from './components/grid-button/grid-button.component';
import { GridLinkComponent } from './components/grid-link/grid-link.component';
import { MatIconModule } from '@angular/material/icon';
import { ComplexityComponent } from './components/complexity/complexity.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DownloadPlaylistsHeaderComponent } from './components/download-playlists-header/download-playlists-header.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { ChartsModule } from 'ng2-charts';
import { GridImageComponent } from './components/grid-avatar/grid-image.component';
import { MatTabsModule } from "@angular/material/tabs";
import { MatChipsModule } from '@angular/material/chips';
import { GridPlayerRankComponent } from './components/grid-player-rank/grid-player-rank.component';
import { MatMenuModule } from '@angular/material/menu';

const routes: Routes = [
  { path: '', redirectTo: 'leaderboard', pathMatch: 'full' },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'ranked-maps', component: RankedMapsComponent },
  { path: 'map-leaderboards/:leaderboardId', component: MapLeaderboardComponent },
  { path: 'player-profile/:playerId', component: ProfileComponent },
  { path: 'staff-login', component: StaffLoginComponent },
  // { path: 'bi-weekly-challenge', component: BiWeeklyChallengeComponent },
];

@NgModule({
  declarations: [
    LeaderboardComponent,
    RankedMapsComponent,
    BiWeeklyChallengeComponent,
    StaffLoginComponent,
    SignUpComponent,
    MapLeaderboardComponent,
    GridButtonComponent,
    DownloadPlaylistsHeaderComponent,
    GridLinkComponent,
    ComplexityComponent,
    ProfileComponent,
    GridImageComponent,
    GridPlayerRankComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AgGridModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    SharedModule,
    FormsModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatSelectModule,
    ChartsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatChipsModule,
    MatMenuModule
  ]
})
export class CoreModule {}
