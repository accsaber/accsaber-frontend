import { Component, OnInit } from '@angular/core';
import { Label, SingleDataSet } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RankSongService } from './rank-song.service';
import { RankSongDto } from '../../../shared/model/rank-song-dto';
import { showError, showInfo } from '../../../shared/utlis/snackbar-utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RankedStatistics } from '../../../shared/model/ranked-statistics';
import { Category } from '../../../shared/model/category';

function getValues(): number[] {
  const start = 96;
  const end = 100;
  const increment = 0.125;

  const values = [];
  for (let i = start; i <= end; i += increment) {
    values.push(i);
  }

  return values;
}

@Component({
  selector: 'app-rank-song',
  templateUrl: './rank-song.component.html',
  styleUrls: ['./rank-song.component.scss'],
})
export class RankSongComponent implements OnInit {
  rankForm: FormGroup = this.fb.group({
    leaderboardId: ['', [Validators.required]],
    songHash: ['', [Validators.required]],
    difficulty: ['normal'],
    categoryName: [''],
  });
  complexity = 7;

  categories: Category[];
  complexitySet: SingleDataSet = [];
  complexityLabels: Label[] = [];
  complexityOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    scales: {
      yAxes: [
        {
          ticks: { min: 150, max: 350 },
          display: true,
          scaleLabel: { labelString: 'AP', display: true },
        },
      ],
      xAxes: [{ scaleLabel: { labelString: 'Accuracy', display: true } }],
    },
  };

  rankedStatistics: RankedStatistics;
  rankedCount: SingleDataSet = [];
  rankedComplexity = [];
  rankedStatsOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    scales: {
      yAxes: [
        {
          ticks: { min: 0, suggestedMax: 10 },
          display: true,
          scaleLabel: { labelString: 'Number of maps', display: true },
        },
      ],
      xAxes: [{ scaleLabel: { labelString: 'complexity', display: true } }],
    },
  };

  constructor(
    private rankSongService: RankSongService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.complexityLabels = getValues().map((v) => `${v.toFixed(2)}%`);
    this.recalculateComplexityValues();
    this.loadStatistics();
    this.loadCategories();
  }

  calculateApByAcc(accuracy: number): number {
    return (Math.pow(1.0000004, Math.pow(accuracy, 3.5)) - 1) * (5 + this.complexity / 10);
  }

  recalculateComplexityValues(): void {
    this.complexitySet = getValues().map((v) => this.calculateApByAcc(v));
  }

  rankSong(): void {
    const rankSongInfo: RankSongDto = this.rankForm.getRawValue();
    rankSongInfo.complexity = this.complexity;
    this.rankSongService.rankSong(rankSongInfo).subscribe(
      () => {
        showInfo(this.snackbar, 'Successfully ranked map');
        this.loadStatistics();
        this.rankForm.reset();
        this.rankForm.markAsUntouched();
      },
      () =>
        showError(
          this.snackbar,
          'An error occurred while ranking the map. No further info is available'
        )
    );
  }

  private loadStatistics(): void {
    this.rankSongService.getRankedStatistic().subscribe((rankedStats) => {
      this.rankedStatistics = rankedStats;

      this.rankedComplexity = Object.keys(this.rankedStatistics.complexityToMapCount).sort((r, v) =>
        Number(r) > Number(v) ? 1 : -1
      );

      this.rankedCount = this.rankedComplexity.map(
        (t) => rankedStats.complexityToMapCount[t.toString()]
      );
    });
  }

  private loadCategories(): void {
    this.rankSongService
      .getAllCategories()
      .subscribe((categories) => (this.categories = categories));
  }
}
