import { Component, OnInit } from '@angular/core';
import {
  GridOptions,
  NumberFilter, ValueFormatterParams,
  ValueGetterParams,
} from 'ag-grid-community';
import { LeaderboardService } from './leaderboard.service';
import { Observable } from 'rxjs';
import { Player } from '../../../shared/model/player';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  leaderboardGrid: GridOptions = {
    pagination: true,
    defaultColDef: {
      sortable: true,
      filter: true,
      filterParams: {
        suppressAndOrCondition: true,
        buttons: ['clear'],
      },
    },
    columnDefs: [
      { field: 'rank', filter: NumberFilter },
      { field: 'playerName' },
      { field: 'ap', filter: NumberFilter },
      {
        field: 'averageAcc',
        valueGetter: (params) => this.accValueGetter(params),
        valueFormatter: (params) => this.accValueFormatter(params),
        filter: NumberFilter,
      },
      { field: 'hmd' },
    ],
  };

  rowData: Observable<Player[]>;

  constructor(private ls: LeaderboardService) {
    this.rowData = ls.getLeaderBoard();
  }

  ngOnInit(): void {}

  private accValueGetter(params: ValueGetterParams): number {
    return params.data.averageAcc * 100;
  }

  private accValueFormatter(params: ValueFormatterParams): string {
    return `${params.value}%`;
  }
}
