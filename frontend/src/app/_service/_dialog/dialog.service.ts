import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewChartComponent } from '../../_dialog/view-chart/view-chart.component';
import { CommentComponent } from '../../_dialog/comment/comment.component';
import { Observable } from 'rxjs';
import { ValidateChangeComponent } from '../../_dialog/validate-change/validate-change.component';
import { ProcessLog } from '../../_model/_interface/process-log';
import { Cars } from '../../_model/_interface/car';
import { ViewLineComponent } from '../../_dialog/view-line/view-line.component';
import { ViewPolarComponent } from '../../_dialog/view-polar/view-polar.component';
import { ViewType } from '../../_dialog/view-type';
import { Machines } from '../../_model/_interface/machine';
import { ViewData } from '../../_dialog/view-data';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openDialogViewChart(data: ViewData, type: ViewType, title: string) {
    const dialogRef = this.dialog.open(ViewChartComponent, {
      data: { data: data, type: type, title: title },
      restoreFocus: false,
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log('Dialog closed', result);
    // });
  }

  openDialogViewLine(data: ViewData, type: ViewType, title: string) {
    const dialogRef = this.dialog.open(ViewLineComponent, {
      data: { data: data, type: type, title: title },
      restoreFocus: false,
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log('Dialog closed', result);
    // });
  }

  openDialogViewPolar(data: ViewData, type: ViewType, title: string) {
    const dialogRef = this.dialog.open(ViewPolarComponent, {
      data: { data: data, type: type, title: title },
      restoreFocus: false,
    });
  }

  openDialogCommentTask(taskId: string): Observable<any> {
    const dialogRef = this.dialog.open(CommentComponent, {
      data: { id: taskId },
      restoreFocus: false,
    });

    return dialogRef.afterClosed();
  }

  openDialogValidateChange(message: string): Observable<any> {
    const dialogRef = this.dialog.open(ValidateChangeComponent, {
      data: { message: message },
      restoreFocus: false,
    });
    return dialogRef.afterClosed();
  }
}
