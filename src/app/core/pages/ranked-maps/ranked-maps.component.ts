import { Component, OnInit } from '@angular/core';
import { GridApi, GridOptions, NumberFilter } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { RankedMap } from '../../../shared/model/ranked-map';
import { RankedMapsService } from './ranked-maps.service';
import { capitalize, songNameValueGetter } from '../../../shared/utlis/global-utils';
import { Router } from '@angular/router';
import { GridButtonComponent } from '../../components/grid-button/grid-button.component';
import { GridLinkComponent } from '../../components/grid-link/grid-link.component';
import { TechynessComponent } from '../../components/techyness/techyness.component';
import { createPlaylist } from '../../../shared/utlis/playlist-utils';
import { HeaderButtonComponent } from '../../components/header-button/header-button.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ranked-maps',
  templateUrl: './ranked-maps.component.html',
  styleUrls: ['./ranked-maps.component.scss'],
})
export class RankedMapsComponent implements OnInit {
  rankedMapGripOptions: GridOptions = {
    pagination: true,
    paginationAutoPageSize: true,
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
        headerName: 'Song',
        cellRendererFramework: GridLinkComponent,
        cellRendererParams: { link: '/map-leaderboards', accessor: 'leaderboardId' },
        valueGetter: (params) => songNameValueGetter(params.data),
      },
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
        headerComponentFramework: HeaderButtonComponent,
        headerClass: 'grid-center',
        cellClass: 'grid-center-cell',
        headerComponentParams: {
          buttonInfo: {
            clickCallback: (data) => this.createPlaylist(data),
            icon: 'get_app',
            color: 'primary',
            tooltip: 'Download Ranked Map Playlist',
          },
        },
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

  constructor(
    private rankedMapsService: RankedMapsService,
    private router: Router,
    private http: HttpClient
  ) {}

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

  private createPlaylist(api: GridApi): void {
    createPlaylist(api, this.http);
  }
}
