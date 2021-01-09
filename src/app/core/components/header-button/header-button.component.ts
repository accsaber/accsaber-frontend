import { Component } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid-community';

@Component({
  selector: 'app-grid-button',
  templateUrl: './header-button.component.html',
  styleUrls: ['./header-button.component.scss'],
})
export class HeaderButtonComponent implements IHeaderAngularComp {
  params: GridButtonParams;

  constructor() {}

  agInit(params: GridButtonParams): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }

  onButtonClicked(): void {
    this.params.buttonInfo.clickCallback(this.params.api);
  }
}

interface GridButtonParams extends IHeaderParams {
  buttonInfo: ButtonInfo;
}

interface ButtonInfo {
  icon: string;
  clickCallback: (key: any) => void;
  color: string;
  link: string;
  tooltip: string;
}
