import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MapLeaderboardService } from './map-leaderboard.service';
import { MapLeaderboardPlayer } from '../../../shared/model/map-leaderboard-player';
import { Observable } from 'rxjs';
import { GridOptions, Module, NumberFilter } from '@ag-grid-community/core';
import { capitalize, getPlayerId } from '../../../shared/utlis/global-utils';
import { RankedMap } from '../../../shared/model/ranked-map';
import { getBaseGridOptions } from '../../../shared/utlis/grid-utils';
import { ChartOptions } from 'chart.js';
import * as moment from 'moment';
import { environment } from '../../../../environments/environment';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

@Component({
  selector: 'app-map-leaderboard',
  templateUrl: './map-leaderboard.component.html',
  styleUrls: ['./map-leaderboard.component.scss'],
})
export class MapLeaderboardComponent implements OnInit {
  imageUrl = environment.imageUrl;

  rowData: Observable<MapLeaderboardPlayer[]>;

  modules: Module[] = [ClientSideRowModelModule];
  mapInfo: RankedMap;

  accuracyHistoryData = [];
  accuracyHistoryDates = [];
  accuracyHistoryOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    scales: {
      yAxes: [
        {
          display: true,
          scaleLabel: { labelString: 'Accuracy', display: true },
        },
      ],
      xAxes: [
        {
          scaleLabel: { labelString: 'Date Set', display: true },
        },
      ],
    },
  };

  gridOptions: GridOptions = getBaseGridOptions([
    { type: 'rank' },
    { type: 'avatar' },
    { type: 'playerName' },
    { type: 'timeSet' },
    { type: 'accuracy' },
    { type: 'ap' },
    { field: 'score', filter: NumberFilter },
  ]);

  constructor(
    private route: ActivatedRoute,
    private mapLeaderboardService: MapLeaderboardService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const leaderboardId = params.leaderboardId;
      this.rowData = this.mapLeaderboardService.getMapLeaderboard(leaderboardId);
      this.mapLeaderboardService.getMapData(leaderboardId).subscribe((rankedMap) => {
        this.mapInfo = rankedMap;

        const playerId = getPlayerId();
        if (playerId) {
          this.parseHistory(playerId, leaderboardId);
        }
      });
    });
  }

  capitalize(difficulty: string): string {
    return capitalize(difficulty);
  }

  // TODO kinda eww
  private parseHistory(playerId: string, leaderboardId: string): void {
    this.mapLeaderboardService.getAccHistory(playerId, leaderboardId).subscribe((history) => {
      if (Object.keys(history).length === 0) {
        return;
      }
      const keys = Object.keys(history).sort((r, v) => (moment(r) > moment(v) ? 1 : -1));
      this.accuracyHistoryDates = keys.map((s) => moment(s).fromNow());
      this.accuracyHistoryData = keys.map((t) => (history[t] * 100).toFixed(2));
      this.rowData.subscribe((r) => {
        const mapLeaderboardPlayer = r.find((layerScore) => getPlayerId() === layerScore.playerId);
        if (mapLeaderboardPlayer) {
          if (keys.includes(mapLeaderboardPlayer.timeSet)) {
            return;
          }
          this.accuracyHistoryDates.push(moment(mapLeaderboardPlayer.timeSet).fromNow());
          this.accuracyHistoryData.push((mapLeaderboardPlayer.accuracy * 100).toFixed(2));
        }
      });
    });
  }
}
