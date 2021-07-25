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
          const tabs: Tab[] = [{ label: 'Overall', categoryName: 'overall', active: true }];
          categories
            .map((category) => {
              return {
                label: getTitleCase(category.categoryName),
                categoryName: category.categoryName,
                active: false,
              };
            })
            .forEach((tab) => tabs.push(tab));
          return tabs;
        })
      )
      .subscribe((tabs) => this.tabs.next(tabs));
  }

  onTabClick(index: number): void {
    const tab = this.tabs.value[index];
    if (!tab.rowData) {
      this.leaderboardGridOptions.api.showLoadingOverlay();
      this.leaderboardService.getSpecificLeaderBoard(tab.categoryName).subscribe((value) => {
        tab.rowData = value;
        this.rowData = tab.rowData;

        this.leaderboardGridOptions.api.hideOverlay();
      });
    } else {
      this.rowData = tab.rowData;
    }
  }
}

export interface Tab {
  label: string;
  categoryName: string;
  active: boolean;
  rowData?: Player[];
}
