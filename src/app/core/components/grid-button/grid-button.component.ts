import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-grid-button',
  templateUrl: './grid-button.component.html',
  styleUrls: ['./grid-button.component.scss'],
})
export class GridButtonComponent implements ICellRendererAngularComp {
  buttonInfos: ButtonInfo[];
  data: any;

  constructor() {}

  agInit(params: GridButtonParams): void {
    this.buttonInfos = params.buttonInfos;
    this.data = params.data;
  }

  refresh(params: any): boolean {
    return false;
  }

  onButtonClicked(buttonInfo: ButtonInfo): void {
    buttonInfo.clickCallback(this.data[buttonInfo.accessor]);
  }
}

interface GridButtonParams extends ICellRendererParams {
  buttonInfos: ButtonInfo[];
}

interface ButtonInfo {
  icon: string;
  clickCallback: (key: string) => void;
  accessor: string;
  color: string;
  link: string;
}
