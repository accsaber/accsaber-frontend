import { Component, OnInit } from '@angular/core';
import { GridOptions, NumberFilter } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { RankedMap } from '../../../shared/model/ranked-map';
import { RankedMapsService } from './ranked-maps.service';
import { capitalize } from '../../../shared/utlis/global-utils';
import { Router } from '@angular/router';
import { GridButtonComponent } from '../../components/grid-button/grid-button.component';
import { GridLinkComponent } from '../../components/grid-link/grid-link.component';
import { TechynessComponent } from '../../components/techyness/techyness.component';

@Component({
  selector: 'app-ranked-maps',
  templateUrl: './ranked-maps.component.html',
  styleUrls: ['./ranked-maps.component.scss'],
})
export class RankedMapsComponent implements OnInit {
  rankedMapGripOptions: GridOptions = {
    pagination: true,
    suppressCellSelection: true,
    enableCellTextSelection: true,
    suppressRowHoverHighlight: true,
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
      },
      button: {
        cellRendererFramework: GridButtonComponent,
        sortable: false,
        filter: false,
        suppressMenu: true,
      },
    },
    columnDefs: [
      {
        field: 'songName',
        headerName: 'Name',
        cellRendererFramework: GridLinkComponent,
        cellRendererParams: { link: '/map-leaderboards', accessor: 'leaderboardId' },
      },
      { field: 'songAuthorName', headerName: 'Artist' },
      { field: 'levelAuthorName', headerName: 'Mapper' },
      {
        field: 'difficulty',
        valueFormatter: (params) => capitalize(params.value),
        type: 'finalColumn',
      },
      {
        field: 'techyness',
        headerName: 'Techyness',
        filter: NumberFilter,
        cellRendererFramework: TechynessComponent,
      },
      {
        headerName: '',
        type: 'button',
        cellRendererParams: {
          buttonInfos: [
            {
              clickCallback: (key) => this.openBeatSaver(key),
              icon: 'archive',
              accessor: 'beatsaverKey',
            },
            {
              clickCallback: (leaderboardId) => this.openScoresaberLeaderboard(leaderboardId),
              icon: 'poll',
              accessor: 'leaderboardId',
              color: '#e9d409',
            },
          ],
        },
      },
    ],
  };
  rowData: Observable<RankedMap[]>;

  constructor(private rankedMapsService: RankedMapsService, private router: Router) {}

  ngOnInit(): void {
    this.rowData = this.rankedMapsService.getRankedMaps();
  }

  resizeGrid(): void {
    this.rankedMapGripOptions.columnApi.autoSizeAllColumns();
    this.rankedMapGripOptions.api.sizeColumnsToFit();
  }

  private openBeatSaver(key: string): void {
    window.open(`https://beatsaver.com/beatmap/${key}`, '_blank');
  }

  private openScoresaberLeaderboard(leaderboardId: string): void {
    window.open(`https://scoresaber.com/leaderboard/${leaderboardId}`, '_blank');
  }
}
