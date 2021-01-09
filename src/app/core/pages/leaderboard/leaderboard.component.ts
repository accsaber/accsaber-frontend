import { Component, OnInit } from '@angular/core';
import { GridOptions, NumberFilter } from 'ag-grid-community';
import { LeaderboardService } from './leaderboard.service';
import { Observable } from 'rxjs';
import { Player } from '../../../shared/model/player';
import { accValueFormatter, getPlayerId } from '../../../shared/utlis/global-utils';
import { GridLinkComponent } from '../../components/grid-link/grid-link.component';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  leaderboardGridOptions: GridOptions = {
    pagination: true,
    paginationAutoPageSize: true,
    animateRows: true,
    suppressRowHoverHighlight: true,
    suppressCellSelection: true,
    enableCellTextSelection: true,
    getRowStyle: (params) =>
      params.data.playerId === getPlayerId() ? { background: 'lightgreen' } : {},
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
      finalColumn: {
        suppressSizeToFit: false,
        suppressAutoSize: true,
        suppressMenu: true,
        sortable: false,
      },
    },
    columnDefs: [
      { field: 'rank', filter: NumberFilter },
      {
        headerName: 'Player Name',
        field: 'playerName',
        cellRendererFramework: GridLinkComponent,
        cellRendererParams: { link: '/player-profile', accessor: 'playerId' },
      },
      {
        field: 'ap',
        headerName: 'AP',
        filter: NumberFilter,
        valueFormatter: (params) => params.value.toFixed(2),
        sortingOrder: ['desc', 'asc', ''],
      },
      {
        field: 'averageAcc',
        valueGetter: (params) => params.data.averageAcc * 100,
        valueFormatter: (params) => accValueFormatter(params),
        filter: NumberFilter,
        sortingOrder: ['desc', 'asc', ''],
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
      { field: '', type: 'finalColumn' },
    ],
  };

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