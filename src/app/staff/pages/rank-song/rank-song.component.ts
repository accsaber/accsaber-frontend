import { Component, OnInit } from '@angular/core';
import { Label, SingleDataSet } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RankSongService } from './rank-song.service';
import { RankSongDto } from '../../../shared/model/rank-song-dto';
import { showError, showInfo } from '../../../shared/utlis/snackbar-utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RankedStatistics } from '../../../shared/model/ranked-statistics';

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
    beatSaverKey: ['', [Validators.required]],
    difficulty: ['normal'],
  });
  techyness = 7;

  techynessSet: SingleDataSet = [];
  techynessLabels: Label[] = [];
  techynessOptions: ChartOptions = {
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
  rankedTechyness = [];
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
      xAxes: [{ scaleLabel: { labelString: 'techyness', display: true } }],
    },
  };

  constructor(
    private rankSongService: RankSongService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.techynessLabels = getValues().map((v) => `${v.toFixed(2)}%`);
    this.recalculateTechynessValues();
    this.loadStatistics();
  }

  calculateApByAcc(accuracy: number): number {
    return (Math.pow(1.0000004, Math.pow(accuracy, 3.5)) - 1) * (5 + this.techyness / 10);
  }

  recalculateTechynessValues(): void {
    this.techynessSet = getValues().map((v) => this.calculateApByAcc(v));
  }

  rankSong(): void {
    const rankSongInfo: RankSongDto = this.rankForm.getRawValue();
    rankSongInfo.techyness = this.techyness;
    console.log(rankSongInfo);
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

      this.rankedTechyness = Object.keys(this.rankedStatistics.techynessToMapCount).sort((r, v) =>
        Number(r) > Number(v) ? 1 : -1
      );

      this.rankedCount = this.rankedTechyness.map(
        (t) => rankedStats.techynessToMapCount[t.toString()]
      );
    });
  }
}
