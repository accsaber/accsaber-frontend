import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankSongComponent } from './pages/rank-song/rank-song.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', redirectTo: 'maps', pathMatch: 'full' },
  // { path: 'dashboard', redirectTo: 'maps', pathMatch: 'full' },
  { path: 'maps', component: RankSongComponent },
];

@NgModule({
  declarations: [RankSongComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class StaffModule {}
