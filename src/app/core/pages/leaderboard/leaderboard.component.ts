import { Component, OnInit } from '@angular/core';
import { GridOptions, NumberFilter } from 'ag-grid-community';
import { LeaderboardService } from './leaderboard.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Player } from '../../../shared/model/player';
import { getBaseGridOptions } from '../../../shared/utlis/grid-utils';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  leaderboardGridOptions: GridOptions = getBaseGridOptions([
    { type: 'rank' },
    { type: 'avatar' },
    { type: 'playerName' },
    { type: 'ap' },
    {
      type: 'accuracy',
      field: 'averageAcc',
      valueGetter: (params) => params.data.averageAcc * 100,
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
  ]);

  rowData: Observable<Player[]>;
  tabs: BehaviorSubject<Tab[]> = new BehaviorSubject<Tab[]>(null);

  constructor(private ls: LeaderboardService) {}

  ngOnInit(): void {
    this.rowData = this.ls.getLeaderBoard();

    setTimeout(() => {
      this.tabs.next([
        { label: 'Total', id: 'total', active: true },
        { label: 'True Acc', id: 'true-acc', active: false },
        { label: 'Standard Acc', id: 'standard-acc', active: false },
        { label: 'Tech Acc', id: 'tech-acc', active: false },
      ]);
    }, 2000);
  }

  onTabClick(index: number): void {
    console.log('What');
    this.tabs.value.forEach((t) => (t.active = false));
    this.tabs.value[index].active = true;
  }
}

export interface Tab {
  label: string;
  id: string;
  active: boolean;
}
