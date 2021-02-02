import { Component, Input, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-techyness',
  templateUrl: './techyness.component.html',
  styleUrls: ['./techyness.component.scss'],
})
export class TechynessComponent implements ICellRendererAngularComp, OnInit {
  @Input() value: number;
  normVal: number;
  rgbValue: string;

  constructor() {}

  agInit(params: ICellRendererParams): void {
    this.value = params.value;
  }

  private do(): void {
    this.normVal = Math.min(this.value, 15);
    const red = (this.normVal / 15) * 255;
    const green = Math.max(((15 - this.normVal) / 15) * 255, 0);
    const blue = Math.max(-((this.normVal - 7) * (this.normVal - 7)) * 100 + 255, 0);

    this.rgbValue = `rgb(${red}, ${green},${blue})`;
  }

  ngOnInit(): void {
    this.do();
  }

  refresh(params: any): boolean {
    return false;
  }
}
