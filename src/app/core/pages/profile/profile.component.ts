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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  rowData: Observable<PlayerScore[]>;
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
      this.profileService.getPlayerInfo(playerId).subscribe((player) => (this.playerInfo = player));
    });
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
