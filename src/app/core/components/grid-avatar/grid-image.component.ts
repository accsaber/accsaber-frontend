import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-grid-avatar',
  templateUrl: './grid-image.component.html',
  styleUrls: ['./grid-image.component.scss'],
})
export class GridImageComponent implements ICellRendererAngularComp {
  imageUrl: string;
  constructor() {}

  agInit(params: ICellRendererParams): void {
    this.imageUrl = params.value;
  }

  refresh(params: any): boolean {
    return false;
  }
}
