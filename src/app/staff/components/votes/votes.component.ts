import { Component, Input, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { GridParams, ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.scss']
})
export class VotesComponent implements ICellRendererAngularComp, OnInit {
  params: GridParams;

  constructor() {}

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  ngOnInit(): void {
  }

  refresh(params: any): boolean {
    return false;
  }
}
