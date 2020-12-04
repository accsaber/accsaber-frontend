import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { AgGridModule } from 'ag-grid-angular';
import { RankedMapsComponent } from './pages/ranked-maps/ranked-maps.component';
import { WeeklyChallengeComponent } from './pages/weekly-challenge/weekly-challenge.component';
import { StaffLoginComponent } from './pages/staff-login/staff-login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', redirectTo: 'leaderboard', pathMatch: 'full' },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'ranked-maps', component: RankedMapsComponent },
  // { path: 'staff-login', component: StaffLoginComponent },
  // { path: 'weekly-challenge', component: WeeklyChallengeComponent },
];

@NgModule({
  declarations: [
    LeaderboardComponent,
    RankedMapsComponent,
    WeeklyChallengeComponent,
    StaffLoginComponent,
    SignUpComponent,
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
  ],
})
export class CoreModule {}
