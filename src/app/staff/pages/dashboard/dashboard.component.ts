import { Component, OnInit, ViewChild } from '@angular/core';
import { RankedMapsInfoComponent } from '../../components/ranked-maps-info/ranked-maps-info.component';
import { QualifiedListComponent } from '../../components/qualified-list/qualified-list.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild(RankedMapsInfoComponent)
  private rankedMapsInfoComponent: RankedMapsInfoComponent;

  @ViewChild(QualifiedListComponent)
  private qualifiedListComponent: QualifiedListComponent;


  ngOnInit(): void {
  }

  onRank(): void {
    this.rankedMapsInfoComponent.refresh();
    this.qualifiedListComponent.refresh();
  }

}
