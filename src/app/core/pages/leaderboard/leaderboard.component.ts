import { Component, OnInit } from '@angular/core';
import { GridOptions, NumberFilter } from 'ag-grid-community';
import { LeaderboardService } from './leaderboard.service';
import { BehaviorSubject } from 'rxjs';
import { Player } from '../../../shared/model/player';
import { getBaseGridOptions } from '../../../shared/utlis/grid-utils';
import { map } from 'rxjs/operators';
import { getTitleCase } from '../../../shared/utlis/global-utils';

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

  rowData: Player[];
  tabs: BehaviorSubject<Tab[]> = new BehaviorSubject<Tab[]>(null);

  constructor(private leaderboardService: LeaderboardService) {}

  ngOnInit(): void {
    this.leaderboardService.getLeaderBoard().subscribe((value) => (this.rowData = value));
    this.leaderboardService
      .getLeaderboards()
      .pipe(
        map((categories) => {
          const tabs: Tab[] = [{ label: 'Total', active: true }];
          categories
            .map((category) => {
              return { label: getTitleCase(category.name), active: false };
            })
            .forEach((tab) => tabs.push(tab));
          return tabs;
        })
      )
      .subscribe((tabs) => this.tabs.next(tabs));
  }

  onTabClick(index: number): void {
    if (!this.tabs.value[index].rowData) {
      this.leaderboardService.getLeaderBoard().subscribe((value) => {
        this.tabs.value[index].rowData = value;
        this.rowData = this.tabs.value[index].rowData;
      });
    } else {
      this.rowData = this.tabs.value[index].rowData;
    }
  }
}

export interface Tab {
  label: string;
  active: boolean;
  rowData?: Player[];
}
