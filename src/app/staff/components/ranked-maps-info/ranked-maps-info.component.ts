import { Component, OnInit } from '@angular/core';
import { RankedStatistics } from '../../../shared/model/ranked-statistics';
import { SingleDataSet } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import { RankSongService } from '../../services/rank-song.service';

@Component({
  selector: 'app-ranked-maps-info',
  templateUrl: './ranked-maps-info.component.html',
  styleUrls: ['./ranked-maps-info.component.scss']
})
export class RankedMapsInfoComponent implements OnInit {
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
    private rankSongService: RankSongService
  ) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  refresh(): void {
    this.loadStatistics();
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
