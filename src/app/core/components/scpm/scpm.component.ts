import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-scpm',
  templateUrl: './scpm.component.html',
  styleUrls: ['./scpm.component.scss'],
})
export class ScpmComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<ScpmComponent>) {}

  ngOnInit(): void {}

  dontShowAndClose(): void {
    localStorage.setItem('dontShowSCPM', 'true');
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}
