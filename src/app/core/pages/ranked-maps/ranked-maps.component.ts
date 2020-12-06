import { Component, OnInit } from '@angular/core';
import { GridOptions, RowClickedEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { RankedMap } from '../../../shared/model/ranked-map';
import { RankedMapsService } from './ranked-maps.service';
import { capitalize } from '../../../shared/utlis/global-utils';
import { Router } from '@angular/router';

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
    },
    onRowClicked: (event) => this.openMapLeaderboard(event),
    columnDefs: [
      { field: 'songName', headerName: 'Name' },
      { field: 'songAuthorName', headerName: 'Artist' },
      { field: 'levelAuthorName', headerName: 'Mapper' },
      {
        field: 'difficulty',
        valueFormatter: (params) => capitalize(params.value),
        type: 'finalColumn',
      },
      { field: 'techyness', headerName: 'Techyness' },
      // { field: 'SCORESABERLINK' },
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

  private openMapLeaderboard(event: RowClickedEvent): void {
    console.log(event);
    this.router.navigateByUrl(`/map-leaderboards/${event.data.leaderboardId}`);
  }
}
