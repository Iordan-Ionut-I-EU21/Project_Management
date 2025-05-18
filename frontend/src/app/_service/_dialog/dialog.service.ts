import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewChartComponent } from '../../_dialog/view-chart/view-chart.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openDialogViewChart(projectId: string, type: 'PROJECT') {
    const dialogRef = this.dialog.open(ViewChartComponent, {
      data: { projectId: projectId, type: type },
      restoreFocus: false,
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log('Dialog closed', result);
    // });
  }
}
