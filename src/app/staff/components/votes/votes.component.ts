import { Component, Input, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.scss']
})
export class VotesComponent implements ICellRendererAngularComp, OnInit {
  params: GridButtonParams;

  constructor() {}

  agInit(params: GridButtonParams): void {
    this.params = params;
  }

  ngOnInit(): void {
  }

  refresh(params: any): boolean {
    return false;
  }

  onUpvoteClicked(): void {
    this.params.buttonInfos.upvote(this.params.data.key);
  }

  onDownvoteClicked(): void {
    this.params.buttonInfos.downvote(this.params.data.key);
  }

  hasUpvoted(): boolean {
    return this.params.data.userVote === 1;
  }

  hasDownvoted(): boolean {
    return this.params.data.userVote === -1;
  }
}

interface GridButtonParams extends ICellRendererParams {
  buttonInfos: ButtonInfo;
}

interface ButtonInfo {
  upvote: (key: string) => void;
  downvote: (key: string) => void;
}
