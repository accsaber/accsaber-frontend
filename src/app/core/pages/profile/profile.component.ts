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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  rowData: Observable<PlayerScore[]>;
  skillLabels: Label[] = ['Tech', 'StandardTech', 'Standard', 'StandardTrue', 'True'];
  playerSkill: ChartDataSets[] = [{ data: [0, 0, 0, 0, 0] }];
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

  playerInfo: Player;
  gridOptions: GridOptions = getBaseGridOptions([
    { type: 'rank' },
    { type: 'song' },
    { type: 'accuracy' },
    { type: 'ap' },
    { type: 'timeSet' },
    { type: 'stretchColumn' },
    { type: 'difficulty' },
    { type: 'techyness' },
  ]);

  constructor(private route: ActivatedRoute, private profileService: ProfileService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const playerId = params.playerId;
      this.rowData = this.profileService.getPlayerRankedScores(playerId);
      this.rowData.subscribe((scores) => {
        const tech = this.calcSkill(scores, 10);
        const techStandard = this.calcSkill(scores, 9, 12);
        const standard = this.calcSkill(scores, 5, 10);
        const standardTrue = this.calcSkill(scores, 3, 6);
        const trueAcc = this.calcSkill(scores, -100, 4);

        this.playerSkill[0].data = [tech, techStandard, standard, standardTrue, trueAcc];
      });
      this.profileService.getPlayerInfo(playerId).subscribe((player) => (this.playerInfo = player));
    });
  }

  calcSkill(scores: PlayerScore[], minTech: number, maxTech: number = 100): number {
    const playerScores = scores.filter((s) => minTech <= s.techyness && s.techyness <= maxTech);
    return Math.max(
      Math.round(
        (playerScores.reduce((sum, current) => sum + current.ap, 0) / playerScores.length - 190) /
          0.75
      ),
      0
    );
  }

  resizeGrid(): void {
    this.gridOptions.columnApi.autoSizeAllColumns();
    this.gridOptions.api.sizeColumnsToFit();
  }

  setAsProfile(): void {
    savePlayerToStorage(this.playerInfo.playerName, this.playerInfo.playerId);
    window.location.reload();
  }
}
