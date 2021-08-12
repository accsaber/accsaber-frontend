import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GridOptions } from 'ag-grid-community';
import { savePlayerToStorage } from '../../../shared/utlis/global-utils';
import { ProfileService } from './profile.service';
import { PlayerScore } from '../../../shared/model/player-score';
import { Player } from '../../../shared/model/player';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { getBaseGridOptions } from '../../../shared/utlis/grid-utils';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  rowData: Observable<PlayerScore[]>;
  skillLabels: Label[] = [];
  playerSkill: ChartDataSets[] = [];
  options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    scale: {
      ticks: { min: 0, max: 100, display: false },
      gridLines: { color: '#80808040' },
      pointLabels: { fontColor: 'gray', fontSize: 14 },
      angleLines: { color: '#80808020' },
    },
  };

  rankHistoryData = [5, 2, 4, 1];
  rankHistoryDates = ['3 days ago', '2 days ago', '1 day ago', 'today'];
  rankHistoryOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 0.5,
            reverse: true,
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: { labelString: 'Date Set', display: false },
        },
      ],
    },
  };

  playerInfo: Player;
  gridOptions: GridOptions = getBaseGridOptions([
    { type: 'rank' },
    { type: 'songCoverArt' },
    { type: 'song' },
    { type: 'category' },
    { type: 'accuracy' },
    { type: 'weightedAp' },
    { type: 'timeSet' },
    { type: 'difficulty' },
    { type: 'complexity' },
  ]);
  imageUrl = environment.imageUrl;

  constructor(private route: ActivatedRoute, private profileService: ProfileService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const playerId = params.playerId;
      this.rowData = this.profileService.getPlayerRankedScores(playerId);
      this.rowData.subscribe((scores) => {
        this.profileService.getAllCategories().subscribe((categories) => {
          this.skillLabels = categories.map((c) => c.categoryDisplayName);
          this.playerSkill[0].data = categories.map((category) => {
            const categoryScores = scores.filter((s) => s.categoryDisplayName === category.categoryDisplayName);
            return this.calcSkill(categoryScores) ?? 0;
          });
        });
      });
      this.profileService.getPlayerInfo(playerId).subscribe((player) => (this.playerInfo = player));
    });
  }

  calcSkill(scores: PlayerScore[]): number {
    const averageAp = scores.reduce((sum, current) => sum + current.ap, 0) / scores.length || 0;
    console.log(averageAp);
    if (averageAp < 460) {
      return Math.max(Math.round(averageAp / 46), 0);
    }
    return Math.max(Math.round((averageAp - 400) / 6), 0);
  }

  setAsProfile(): void {
    savePlayerToStorage(this.playerInfo.playerName, this.playerInfo.playerId);
    window.location.reload();
  }
}
