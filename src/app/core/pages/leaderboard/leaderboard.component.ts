import { Component, OnInit } from '@angular/core';
import { GridOptions, Module, NumberFilter } from '@ag-grid-community/core';
import { LeaderboardService } from './leaderboard.service';
import { BehaviorSubject } from 'rxjs';
import { Player } from '../../../shared/model/player';
import { getBaseGridOptions } from '../../../shared/utlis/grid-utils';
import { map } from 'rxjs/operators';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  leaderboardGridOptions: GridOptions = getBaseGridOptions([
    { type: 'playerRank' },
    { type: 'avatar' },
    { type: 'playerName' },
    { type: 'ap' },
    {
      type: 'accuracy',
      field: 'averageAcc',
      valueGetter: (params) => params.data.averageAcc * 100,
    },
    { field: 'rankedPlays', filter: NumberFilter, sortingOrder: ['desc', 'asc'] },
    {
      field: 'averageApPerMap',
      headerName: 'Average AP Per Map',
      filter: NumberFilter,
      valueFormatter: (params) => params.value.toFixed(2),
      sortingOrder: ['desc', 'asc'],
    },
    { field: 'hmd', headerName: 'HMD' },
  ]);

  curLeaderboard: CurrentTab = { rowData: [], tabType: null };
  tabs: BehaviorSubject<Tab[]> = new BehaviorSubject<Tab[]>(null);
  rankedCategoryTabs: Tab[] = [];
  modules: Module[] = [ClientSideRowModelModule];

  constructor(private leaderboardService: LeaderboardService) {}

  ngOnInit(): void {
    this.leaderboardService
      .getLeaderboards()
      .pipe(
        map((categories) => {
          const tabs: Tab[] = [
            {
              label: 'Overall',
              categoryName: 'overall',
              active: true,
              tabType: TabType.IS_OVERALL,
            },
          ];
          categories
            .map((category) => {
              return {
                label: category.categoryDisplayName,
                categoryName: category.categoryName,
                active: false,
                tabType: category.countsTowardsOverall ? TabType.COUNTS : TabType.DOES_NOT_COUNT,
              };
            })
            .forEach((tab) => tabs.push(tab));
          return tabs;
        })
      )
      .subscribe((tabs) => {
        this.rankedCategoryTabs = tabs.filter((t) => t.tabType === TabType.COUNTS);
        this.tabs.next(tabs);
        this.selectCategoryByIndex(0);
      });
  }

  selectCategoryByIndex(index: number): void {
    const tab = this.tabs.value[index];
    this.selectCategory(tab);
  }

  selectCategory(tab: Tab): void {
    if (!tab.rowData) {
      this.leaderboardGridOptions.api.showLoadingOverlay();
      this.leaderboardService.getSpecificLeaderBoard(tab.categoryName).subscribe((value) => {
        tab.rowData = value;
        this.curLeaderboard.rowData = tab.rowData;
        this.curLeaderboard.tabType = tab.tabType;

        this.leaderboardGridOptions.api.hideOverlay();
      });
    } else {
      this.curLeaderboard.rowData = tab.rowData;
      this.curLeaderboard.tabType = tab.tabType;
    }
  }
}

export interface CurrentTab {
  rowData: Player[];
  tabType: TabType;
}

export interface Tab {
  label: string;
  categoryName: string;
  active: boolean;
  rowData?: Player[];
  tabType: TabType;
}

export enum TabType {
  IS_OVERALL = 'isOverall',
  COUNTS = 'counts',
  DOES_NOT_COUNT = 'doesNotCount',
}
