import { Component, OnInit } from '@angular/core';
import { GridApi, GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { RankedMap } from '../../../shared/model/ranked-map';
import { RankedMapsService } from './ranked-maps.service';
import { Router } from '@angular/router';
import { HeaderButtonComponent } from '../../components/header-button/header-button.component';
import { HttpClient } from '@angular/common/http';
import { getBaseGridOptions } from '../../../shared/utlis/grid-utils';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-ranked-maps',
  templateUrl: './ranked-maps.component.html',
  styleUrls: ['./ranked-maps.component.scss'],
})
export class RankedMapsComponent implements OnInit {
  rankedMapGripOptions: GridOptions = getBaseGridOptions([
    { type: 'songCoverArt' },
    { type: 'song' },
    { field: 'levelAuthorName', headerName: 'Mapper' },
    { type: 'difficulty' },
    { type: 'techyness' },
    {
      headerName: '',
      type: 'button',
      width: 150,
      headerComponentFramework: HeaderButtonComponent,
      headerClass: 'grid-center',
      cellClass: 'grid-center-cell',
      headerComponentParams: {
        buttonInfo: {
          clickCallback: (data) => this.getPlaylist(data),
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
  ]);

  rowData: Observable<RankedMap[]>;

  constructor(
    private rankedMapsService: RankedMapsService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.rowData = this.rankedMapsService.getRankedMaps();
  }

  private openBeatSaver(key: string): void {
    window.open(`https://beatsaver.com/beatmap/${key}`, '_blank');
  }

  private openScoresaberLeaderboard(leaderboardId: string): void {
    window.open(`https://scoresaber.com/leaderboard/${leaderboardId}`, '_blank');
  }

  private getPlaylist(api: GridApi): void {
    window.open(`${environment.apiUrl}/ranked-maps/playlist`, '_blank');
  }
}
