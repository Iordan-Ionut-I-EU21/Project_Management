import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewChartComponent } from '../../_dialog/view-chart/view-chart.component';
import { CommentComponent } from '../../_dialog/comment/comment.component';
import { Observable } from 'rxjs';
import { ValidateChangeComponent } from '../../_dialog/validate-change/validate-change.component';
import { ViewLineComponent } from '../../_dialog/view-line/view-line.component';
import { ViewPolarComponent } from '../../_dialog/view-polar/view-polar.component';
import { ViewType } from '../../_dialog/view-type';
import { ViewData } from '../../_dialog/view-data';
import { validateType } from '../../_dialog/validate-change/validate-type';
import { VALIDATE_STATUS } from '../../_dialog/validate-change/validate-status';
import { SearchComponent } from '../../_dialog/search/search.component';

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

    return dialogRef.afterClosed();
  }

  openDialogViewLine(data: ViewData, type: ViewType, title: string) {
    const dialogRef = this.dialog.open(ViewLineComponent, {
      data: { data: data, type: type, title: title },
      restoreFocus: false,
    });

    return dialogRef.afterClosed();
  }

  openDialogViewPolar(data: ViewData, type: ViewType, title: string) {
    const dialogRef = this.dialog.open(ViewPolarComponent, {
      data: { data: data, type: type, title: title },
      restoreFocus: false,
    });
    return dialogRef.afterClosed();
  }

  openDialogCommentTask(taskId: string): Observable<any> {
    const dialogRef = this.dialog.open(CommentComponent, {
      data: { id: taskId },
      restoreFocus: false,
    });

    return dialogRef.afterClosed();
  }

  openDialogValidateChange(
    key: string,
    type: validateType,
    newStatus: VALIDATE_STATUS,
    oldStatus: VALIDATE_STATUS
  ): Observable<any> {
    const dialogRef = this.dialog.open(ValidateChangeComponent, {
      data: {
        key: key,
        type: type,
        newStatus: newStatus,
        oldStatus: oldStatus,
      },
      restoreFocus: false,
    });
    return dialogRef.afterClosed();
  }

  openDialogSearch() {
    const dialogRef = this.dialog.open(SearchComponent, {
      restoreFocus: false,
    });
    return dialogRef.afterClosed();
  }
}
