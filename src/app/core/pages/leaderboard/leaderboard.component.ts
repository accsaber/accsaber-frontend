import { Component, OnInit } from '@angular/core';
import { GridOptions, NumberFilter } from 'ag-grid-community';
import { LeaderboardService } from './leaderboard.service';
import { Observable } from 'rxjs';
import { Player } from '../../../shared/model/player';
import { getBaseGridOptions } from '../../../shared/utlis/grid-utils';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  leaderboardGridOptions: GridOptions = getBaseGridOptions([
    { type: 'rank' },
    { type: 'playerName' },
    { type: 'ap' },
    {
      type: 'accuracy',
      field: 'averageAcc',
      valueGetter: (params) => params.data.averageAcc * 100,
    },
    { field: 'rankedPlays', filter: NumberFilter, sortingOrder: ['desc', 'asc', ''] },
    {
      field: 'averageApPerMap',
      headerName: 'Average AP Per Map',
      filter: NumberFilter,
      valueFormatter: (params) => params.value.toFixed(2),
      sortingOrder: ['desc', 'asc', ''],
    },
    { field: 'hmd', headerName: 'HMD' },
    { field: '', type: 'stretchColumn' },
  ]);

  rowData: Observable<Player[]>;

  constructor(private ls: LeaderboardService) {
    this.rowData = ls.getLeaderBoard();
  }

  ngOnInit(): void {}

  resizeGrid(): void {
    this.leaderboardGridOptions.columnApi.autoSizeAllColumns();
    this.leaderboardGridOptions.api.sizeColumnsToFit();
  }
}
