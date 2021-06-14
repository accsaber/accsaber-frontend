import { Component, OnInit } from '@angular/core';
import { QualifiedListService } from './qualified-list.service';
import { Observable } from 'rxjs';
import { QualifiedMap } from '../../../shared/model/qualified-map';
import { GridOptions } from 'ag-grid-community';
import { getBaseGridOptions } from '../../../shared/utlis/grid-utils';
import { VotesComponent } from '../votes/votes.component';

@Component({
  selector: 'app-qualified-list',
  templateUrl: './qualified-list.component.html',
  styleUrls: ['./qualified-list.component.scss']
})
export class QualifiedListComponent implements OnInit {
  qualifiedListOptions: GridOptions = getBaseGridOptions([
    { type: 'songCoverArt' },
    { type: 'song' },
    { field: 'levelAuthorName', headerName: 'Mapper' },
    { type: 'difficulty' },
    {
      headerName: 'Upvotes/Downvotes',
      cellRendererFramework: VotesComponent,
      cellRendererParams: {
        buttonInfos: {
          upvote: (key) => this.upvote(key),
          downvote: (key) => this.downvote(key)
        }
      }
    },
]);

  rowData: Observable<QualifiedMap[]>;

  constructor(
    private qualifiedListService: QualifiedListService
  ) {}

  ngOnInit(): void {
    this.rowData = this.qualifiedListService.getQualifiedMaps();
  }

  private upvote(key: string): void {
    this.qualifiedListService.upvoteMap(key);
  }

  private downvote(key: string): void {
    this.qualifiedListService.downvoteMap(key);
  }
}
