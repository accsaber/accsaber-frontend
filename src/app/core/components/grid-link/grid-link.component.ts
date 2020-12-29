import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-grid-link',
  templateUrl: './grid-link.component.html',
  styleUrls: ['./grid-link.component.scss'],
})
export class GridLinkComponent implements ICellRendererAngularComp {
  linkValue: string;
  label: string;

  constructor() {}

  agInit(params: GridLinkParams): void {
    this.label = params.value;
    this.linkValue = `${params.link}/${params.data[params.accessor]}`;
  }

  refresh(params: any): boolean {
    return false;
  }
}

interface GridLinkParams extends ICellRendererParams {
  link: string;
  accessor: string;
}
