import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankSongComponent } from './pages/rank-song/rank-song.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChartsModule } from 'ng2-charts';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  { path: '', redirectTo: 'maps', pathMatch: 'full' },
  // { path: 'dashboard', redirectTo: 'maps', pathMatch: 'full' },
  { path: 'maps', component: RankSongComponent },
];

@NgModule({
  declarations: [RankSongComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule,
    ChartsModule,
    MatSliderModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
  ],
})
export class StaffModule {}
