import { Component, Input } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-grid-player-rank',
  templateUrl: './grid-player-rank.component.html',
  styleUrls: ['./grid-player-rank.component.scss'],
})
export class GridPlayerRankComponent implements ICellRendererAngularComp {
  @Input()
  rank: number;
  @Input()
  rankLastWeek: number;

  constructor() {}

  agInit(params: ICellRendererParams): void {
    if (params) {
      this.rank = params.data.rank;
      this.rankLastWeek = params.data.rankLastWeek;
    }
  }

  refresh(params: any): boolean {
    return false;
  }
}
