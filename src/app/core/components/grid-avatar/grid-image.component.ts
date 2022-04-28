import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { ICellRendererParams } from '@ag-grid-community/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-grid-avatar',
  templateUrl: './grid-image.component.html',
  styleUrls: ['./grid-image.component.scss'],
})
export class GridImageComponent implements ICellRendererAngularComp {
  imageUrl = environment.imageUrl;
  imageSubPath: string;
  constructor() {}

  agInit(params: ICellRendererParams): void {
    this.imageSubPath = params.value;
  }

  refresh(params: any): boolean {
    return false;
  }
}
