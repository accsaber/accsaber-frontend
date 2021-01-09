import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MapLeaderboardService } from './map-leaderboard.service';
import { MapLeaderboardPlayer } from '../../../shared/model/map-leaderboard-player';
import { Observable } from 'rxjs';
import { GridOptions, NumberFilter } from 'ag-grid-community';
import { accValueFormatter, capitalize } from '../../../shared/utlis/global-utils';
import { RankedMap } from '../../../shared/model/ranked-map';
import { GridLinkComponent } from '../../components/grid-link/grid-link.component';

@Component({
  selector: 'app-map-leaderboard',
  templateUrl: './map-leaderboard.component.html',
  styleUrls: ['./map-leaderboard.component.scss'],
})
export class MapLeaderboardComponent implements OnInit {
  rowData: Observable<MapLeaderboardPlayer[]>;
  mapInfo: RankedMap;

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
      },
      { field: 'score', filter: NumberFilter },
      {
        field: 'accuracy',
        valueGetter: (params) => params.data.accuracy * 100,
        valueFormatter: (params) => accValueFormatter(params),
        filter: NumberFilter,
      },
      { field: '', type: 'finalColumn' },
    ],
  };

  constructor(
    private route: ActivatedRoute,
    private mapLeaderboardService: MapLeaderboardService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const leaderboardId = params.leaderboardId;
      this.rowData = this.mapLeaderboardService.getMapLeaderboard(leaderboardId);
      this.mapLeaderboardService.getMapData(leaderboardId).subscribe((rankedMap) => (this.mapInfo = rankedMap));
    });
  }

  resizeGrid(): void {
    console.log('yes');
    this.gridOptions.columnApi.autoSizeAllColumns();
    this.gridOptions.api.sizeColumnsToFit();
  }

  capitalize(difficulty: string): string {
    return capitalize(difficulty);
  }
}
