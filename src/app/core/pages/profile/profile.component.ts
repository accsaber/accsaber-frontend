import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GridOptions, NumberFilter } from 'ag-grid-community';
import {
  accValueFormatter,
  capitalize,
  savePlayerToStorage,
  songNameValueGetter,
} from '../../../shared/utlis/global-utils';
import { ProfileService } from './profile.service';
import { PlayerScore } from '../../../shared/model/player-score';
import { Player } from '../../../shared/model/player';
import { TechynessComponent } from '../../components/techyness/techyness.component';
import { GridLinkComponent } from '../../components/grid-link/grid-link.component';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  rowData: Observable<PlayerScore[]>;
  skillLabels: Label[] = ['Tech', 'StandardTech', 'Standard', 'StandardTrue', 'True'];
  playerSkill: ChartDataSets[] = [];
  options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    legend: { display: false },
    animation: { animateRotate: true },
    scale: { ticks: { min: 0, max: 100, display: false } },
  };

  playerInfo: Player;
  gridOptions: GridOptions = {
    pagination: true,
    paginationAutoPageSize: true,
    suppressCellSelection: true,
    enableCellTextSelection: true,
    defaultColDef: {
      sortable: true,
      filter: true,
      filterParams: {
        suppressAndOrCondition: true,
        buttons: ['clear'],
      },
      suppressSizeToFit: true,
    },
    columnTypes: {
      stretchColumn: {
        suppressSizeToFit: false,
        suppressAutoSize: true,
      },
    },
    columnDefs: [
      { field: 'rank', filter: NumberFilter },
      {
        headerName: 'Song',
        valueGetter: (params) => songNameValueGetter(params.data),
        cellRendererFramework: GridLinkComponent,
        cellRendererParams: { link: '/map-leaderboards', accessor: 'leaderboardId' },
        type: 'stretchColumn',
      },
      {
        field: 'difficulty',
        valueFormatter: (params) => capitalize(params.value),
      },
      { headerName: 'Mapper', field: 'levelAuthorName' },
      {
        field: 'accuracy',
        valueGetter: (params) => params.data.accuracy * 100,
        valueFormatter: (params) => accValueFormatter(params),
        filter: NumberFilter,
      },
      {
        field: 'ap',
        headerName: 'AP',
        filter: NumberFilter,
        valueFormatter: (params) => params.value.toFixed(2),
      },
      // { field: 'score', filter: NumberFilter },
      {
        field: 'techyness',
        headerName: 'Techyness',
        filter: NumberFilter,
        cellRendererFramework: TechynessComponent,
      },
    ],
  };

  constructor(private route: ActivatedRoute, private profileService: ProfileService) {
    this.route.params.subscribe((params) => {
      const playerId = params.playerId;
      this.rowData = this.profileService.getPlayerRankedScores(playerId);
      this.rowData.subscribe((scores) => {
        const tech = this.calcSkill(scores, 10);
        const techStandard = this.calcSkill(scores, 9, 12);
        const standard = this.calcSkill(scores, 5, 10);
        const standardTrue = this.calcSkill(scores, 3, 6);
        const trueAcc = this.calcSkill(scores, -100, 4);
        this.playerSkill = [{ data: [tech, techStandard, standard, standardTrue, trueAcc] }];
      });
      this.profileService.getPlayerInfo(playerId).subscribe((player) => (this.playerInfo = player));
    });
  }

  calcSkill(scores: PlayerScore[], minTech: number, maxTech: number = 100): number {
    const playerScores = scores.filter((s) => minTech <= s.techyness && s.techyness <= maxTech);
    return Math.max(
      Math.round(
        (playerScores.reduce((sum, current) => sum + current.ap, 0) / playerScores.length - 200) /
          0.6
      ),
      0
    );
  }

  ngOnInit(): void {}

  resizeGrid(): void {
    this.gridOptions.columnApi.autoSizeAllColumns();
    this.gridOptions.api.sizeColumnsToFit();
  }

  setAsProfile(): void {
    savePlayerToStorage(this.playerInfo.playerName, this.playerInfo.playerId);
    window.location.reload();
  }
}
