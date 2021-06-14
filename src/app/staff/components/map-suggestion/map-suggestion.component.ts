import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RankSongService } from '../../pages/rank-song/rank-song.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RankSongDto } from '../../../shared/model/rank-song-dto';
import { showError, showInfo } from '../../../shared/utlis/snackbar-utils';

@Component({
  selector: 'app-map-suggestion',
  templateUrl: './map-suggestion.component.html',
  styleUrls: ['./map-suggestion.component.scss']
})
export class MapSuggestionComponent implements OnInit {
  @Output() rank: EventEmitter<any> = new EventEmitter();

  rankForm: FormGroup = this.fb.group({
    leaderboardId: ['', [Validators.required]],
    beatSaverKey: ['', [Validators.required]],
    difficulty: ['normal'],
  });
  techyness = 7;

  constructor(
    private rankSongService: RankSongService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
  }

  rankSong(): void {
    const rankSongInfo: RankSongDto = this.rankForm.getRawValue();
    rankSongInfo.techyness = this.techyness;
    this.rankSongService.rankSong(rankSongInfo).subscribe(
      () => {
        showInfo(this.snackbar, 'Successfully ranked map');
        this.rankForm.reset();
        this.rankForm.markAsUntouched();
        this.rank.emit();
      },
      () =>
        showError(
          this.snackbar,
          'An error occurred while ranking the map. No further info is available'
        )
    );
  }
}
