import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewChartComponent } from '../../_dialog/view-chart/view-chart.component';
import { CommentComponent } from '../../_dialog/comment/comment.component';
import { Observable } from 'rxjs';

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

  openDialogCommentTask(taskId: string): Observable<any> {
    const dialogRef = this.dialog.open(CommentComponent, {
      data: { id: taskId },
      restoreFocus: false,
    });

    return dialogRef.afterClosed();
  }
}
