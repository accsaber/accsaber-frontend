import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { RankedMap } from '../../../shared/model/ranked-map';
import { RankedMapsService } from './ranked-maps.service';
import { Router } from '@angular/router';
import { DownloadPlaylistsHeaderComponent } from '../../components/download-playlists-header/download-playlists-header.component';
import { HttpClient } from '@angular/common/http';
import { getBaseGridOptions } from '../../../shared/utlis/grid-utils';

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
    { type: 'complexity' },
    { type: 'category' },
    {
      headerName: '',
      type: 'button',
      width: 150,
      headerComponentFramework: DownloadPlaylistsHeaderComponent,
      headerClass: 'grid-center',
      cellClass: 'grid-center-cell',
      headerComponentParams: {
        buttonInfo: {
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
            accessor: 'beatSaverKey',
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
    window.open(`https://beatsaver.com/maps/${key}`, '_blank');
  }

  private openScoresaberLeaderboard(leaderboardId: string): void {
    window.open(`https://scoresaber.com/leaderboard/${leaderboardId}`, '_blank');
  }
}
