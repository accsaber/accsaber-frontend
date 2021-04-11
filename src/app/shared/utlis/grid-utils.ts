import { ColDef, GridOptions, NumberFilter, ValueFormatterParams } from 'ag-grid-community';
import { GridLinkComponent } from '../../core/components/grid-link/grid-link.component';
import { TechynessComponent } from '../../core/components/techyness/techyness.component';
import { GridButtonComponent } from '../../core/components/grid-button/grid-button.component';
import { capitalize, getPlayerId } from './global-utils';
import * as moment from 'moment';
import { GridImageComponent } from '../../core/components/grid-avatar/grid-image.component';
import { VotesComponent } from '../../staff/components/votes/votes.component';

export function accValueFormatter(params: ValueFormatterParams): string {
  return `${params.value.toFixed(2)}%`;
}

export function songNameValueGetter(data: any): string {
  return `${data.songAuthorName} - ${data.songName}`;
}

export function getGridSelfHighlight(): string {
  return 'rgba(69, 204, 69, 0.5)';
}

export function getApColor(): string {
  return 'rgb(227,79,17)';
}

export function getBaseGridOptions(colDefs: ColDef[]): GridOptions {
  return {
    pagination: true,
    paginationAutoPageSize: true,
    animateRows: true,
    suppressColumnVirtualisation: true,
    suppressRowHoverHighlight: true,
    suppressCellSelection: true,
    enableCellTextSelection: true,
    getRowStyle: (params) =>
      params.data.playerId === getPlayerId() ? { background: getGridSelfHighlight() } : {},
    defaultColDef: {
      sortable: true,
      filter: true,
      filterParams: {
        suppressAndOrCondition: true,
        buttons: ['clear'],
      },
    },
    columnTypes: getColTypes(),
    columnDefs: colDefs,
  };
}

export function getColTypes(): { [key: string]: ColDef } {
  return {
    ap: {
      field: 'ap',
      headerName: 'AP',
      filter: NumberFilter,
      valueFormatter: (params) => params.value.toFixed(2),
      sortingOrder: ['desc', 'asc', ''],
      cellStyle: () => {
        return { color: getApColor() };
      },
      minWidth: 100,
      flex: 0.3,
    },
    rank: {
      field: 'rank',
      filter: NumberFilter,
      minWidth: 100,
      flex: 0.2,
    },
    accuracy: {
      field: 'accuracy',
      valueGetter: (params) => params.data.accuracy * 100,
      valueFormatter: (params) => accValueFormatter(params),
      filter: NumberFilter,
      sortingOrder: ['desc', 'asc', ''],
      minWidth: 150,
      flex: 0.2,
    },
    techyness: {
      field: 'techyness',
      headerName: 'Techyness',
      filter: NumberFilter,
      cellRendererFramework: TechynessComponent,
      flex: 0.5,
      minWidth: 150,
    },
    song: {
      headerName: 'Song',
      valueGetter: (params) => songNameValueGetter(params.data),
      cellRendererFramework: GridLinkComponent,
      cellRendererParams: { link: '/map-leaderboards', accessor: 'leaderboardId' },
      flex: 1,
      minWidth: 300,
    },
    playerName: {
      headerName: 'Player Name',
      field: 'playerName',
      cellRendererFramework: GridLinkComponent,
      cellRendererParams: { link: '/player-profile', accessor: 'playerId' },
      flex: 0.5,
      minWidth: 200,
    },
    difficulty: {
      field: 'difficulty',
      valueFormatter: (params) => capitalize(params.value),
      minWidth: 125,
      flex: 0.3,
    },
    button: {
      cellRendererFramework: GridButtonComponent,
      sortable: false,
      filter: false,
      suppressMenu: true,
      width: 75,
    },
    timeSet: {
      field: 'timeSet',
      valueGetter: (params) => moment(params.data.timeSet),
      valueFormatter: (params) => params.value.fromNow(),
      minWidth: 200,
      flex: 0.4,
    },
    avatar: {
      cellRendererFramework: GridImageComponent,
      valueGetter: (params) => `avatars/${params.data.playerId}.jpg`,
      headerName: '',
      sortable: false,
      filter: false,
      width: 72,
    },
    songCoverArt: {
      cellRendererFramework: GridImageComponent,
      valueGetter: (params) => `covers/${params.data.songHash.toUpperCase()}.png`,
      headerName: '',
      sortable: false,
      filter: false,
      width: 72,
    },
  };
}
