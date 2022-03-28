import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GridOptions, Module } from '@ag-grid-community/core';
import { getPlayerId, savePlayerToStorage } from '../../../shared/utlis/global-utils';
import { ProfileService } from './profile.service';
import { PlayerScore } from '../../../shared/model/player-score';
import { Player } from '../../../shared/model/player';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { getBaseGridOptions } from '../../../shared/utlis/grid-utils';
import { environment } from '../../../../environments/environment';
import * as moment from 'moment';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  isSetAsProfile: boolean;
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

  rankHistoryData = [];
  rankHistoryDates = [];
  rankHistoryOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    hover: {
      intersect: false,
      mode: 'index',
    },
    tooltips: {
      intersect: false,
      mode: 'index',
    },
    elements: {
      line: {
        fill: false,
      },
      point: {
        radius: 0,
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            reverse: true,
            stepSize: 2,
            fontColor: 'gray',
            fontSize: 14,
          },
          gridLines: { color: '#80808040' },
        },
      ],
      xAxes: [
        {
          scaleLabel: { labelString: 'Date Set', display: false },
          display: false,
          gridLines: { color: '#80808040' },
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

  modules: Module[] = [ClientSideRowModelModule];
  imageUrl = environment.imageUrl;
  playerNotFound: boolean;

  constructor(private route: ActivatedRoute, private profileService: ProfileService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const playerId = params.playerId;
      this.isSetAsProfile = playerId === getPlayerId();
      this.rowData = this.profileService.getPlayerRankedScores(playerId);
      this.rowData.subscribe((scores) => {
        this.profileService.getAllCategories().subscribe((categories) => {
          this.skillLabels = categories.map((c) => c.categoryDisplayName);
          this.playerSkill[0].data = categories.map((category) => {
            const categoryScores = scores.filter(
              (s) => s.categoryDisplayName === category.categoryDisplayName
            );
            return this.calcSkill(categoryScores) ?? 0;
          });
        });
      });
      this.profileService.getPlayerInfo(playerId).subscribe(
        (player) => {
          this.playerInfo = player;
          this.profileService
            .getRecentRankedHistory(playerId)
            .subscribe((history) => this.parseHistory(history, player.rank));
        },
        (error) => {
          console.log(error);
          if (error.status === 404) {
            this.playerNotFound = true;
          }
        }
      );
    });
  }

  calcSkill(scores: PlayerScore[]): number {
    const averageAp = scores.reduce((sum, current) => sum + current.ap, 0) / scores.length || 0;
    if (averageAp < 460) {
      return Math.max(Math.round(averageAp / 46), 0);
    }
    return Math.max(Math.round((averageAp - 400) / 6), 0);
  }

  setAsProfile(): void {
    savePlayerToStorage(this.playerInfo.playerName, this.playerInfo.playerId);
    window.location.reload();
  }

  private parseHistory(history: { [p: string]: number }, currentRank: number): void {
    if (Object.keys(history).length === 0) {
      return;
    }

    const keys = Object.keys(history).sort((r, v) => (moment(r) > moment(v) ? 1 : -1));

    this.rankHistoryDates = keys.map((s) => {
      const amountOfDays = moment().diff(moment(s), 'days');
      switch (amountOfDays) {
        case 0:
          return 'today';
        case 1:
          return '1 day ago';
        default:
          return `${amountOfDays} days ago`;
      }
    });
    this.rankHistoryData = keys.map((t) => history[t]);
  }
}
