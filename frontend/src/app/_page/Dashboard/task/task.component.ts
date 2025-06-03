import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgModule,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../../_service/_model/tasks.service';
import { MatCardModule } from '@angular/material/card';
import { Tasks } from '../../../_model/_interface/tasks';
import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ProjectsService } from '../../../_service/_model/projects.service';
import { error } from 'console';
import { ChartData, ChartOptions } from 'chart.js';
import { ChartsPieComponent } from '../../../_components/charts-pie/charts-pie.component';
import { SubTasksService } from '../../../_service/_model/sub-task.service';
import { response } from 'express';
import { SubTasks } from '../../../_model/_interface/sub-tasks';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Environment } from '../../../../environments/environment';
import { ChangePage } from '../../../_model/_common/change-page';
import { SortPage } from '../../../_model/_common/sort-page';
import { TableColumn } from '../../../_model/_common/table-column';
import { TableComponent } from '../../../_components/table/table.component';
import { TasksCommentsService } from '../../../_service/_model/task-commnet.service';
import { TasksComments } from '../../../_model/_interface/task-comment';
import { DialogService } from '../../../_service/_dialog/dialog.service';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Status } from '../../../_model/_enum/status';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    MatCardModule,
    DatePipe,
    MatIconModule,
    ChartsPieComponent,
    TableComponent,
    CommonModule,
    NgIf,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  templateUrl: './task.component.html',
  providers: [
    TasksService,
    SubTasksService,
    ProjectsService,
    TasksCommentsService,
    DialogService,
  ],
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  id!: string;
  task!: Tasks;

  pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  };
  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { position: 'right' },
      tooltip: { enabled: true },
    },
  };
  hasValue: boolean = false;

  columns: TableColumn[] = [
    { key: 'title', code: 'st.title', label: 'Title', type: 'text' },
    {
      key: 'description',
      code: 'st.description',
      label: 'Description',
      type: 'text',
    },
    {
      key: 'dueDate',
      code: 'st.dueDate',
      label: 'End Date',
      pipe: 'date',
    },
    {
      key: 'progress',
      code: 'st.progress',
      label: 'Progress',
      type: 'text',
    },
  ];
  sortPage: SortPage = {
    column: this.columns[0].key,
    direction: '',
  };
  changePage: ChangePage = {
    pageIndex: 0,
    pageSize: Environment.pageSize,
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  data!: SubTasks[];
  count!: number;
  comments!: TasksComments[];

  options = [...Object.keys(Status)];
  form!: FormGroup;
  constructor(
    private _route: ActivatedRoute,
    private _taskService: TasksService,
    private _router: Router,
    private _subTasksService: SubTasksService,
    private _projectService: ProjectsService,
    private _taskComments: TasksCommentsService,
    private _dialogService: DialogService,
    private _fb: FormBuilder,
    private _changeDetection: ChangeDetectorRef
  ) {
    this._route.params.subscribe((params) => {
      this.id = params['id'];

      this._taskService.getById(this.id).subscribe({
        next: (response) => {
          this.task = response;
          this.initForm();
          this.fetchChartPie();
        },
        error: (error) => {
          console.error('Error fetching task:', error);
        },
      });

      this.fetchTaskComments();
      this.fetchTable();
    });
  }

  private initForm() {
    this.form = this._fb.group({
      status: [this.task.status || ''],
    });
  }

  onSortChanged(sortPage: any) {
    this.sortPage = sortPage;
    this.fetchTable();
  }

  onPageChanged(changePage: any) {
    this.changePage = changePage;
    this.fetchTable();
  }

  private fetchTable() {
    this._subTasksService
      .postListById(this.id, this.sortPage, this.changePage)
      .subscribe({
        next: (response) => {
          this.data = response.items;
          this.count = response.count;
        },
        error: (error) => {
          console.error('Error fetching sub-tasks:', error);
        },
      });
  }

  private fetchChartPie() {
    this._projectService.getStatusCounts(this.task?.projectId?.id).subscribe({
      next: (response) => {
        Object.entries(response).forEach(([key, value]) => {
          if (value !== 0) {
            this.hasValue = true;
          }
        });

        const labels = Object.keys(response);
        const data = Object.values(response);

        this.pieChartData.labels = labels;
        this.pieChartData.datasets[0].data = data as number[];
        this.pieChartData.datasets[0].backgroundColor = [
          'rgba(54, 162, 235, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 206, 86, 0.7)',
        ];
        this.pieChartData.datasets[0].borderColor = [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
        ];
        this._changeDetection.detectChanges();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  private fetchTaskComments() {
    this._taskComments.getListByTaskId(this.id).subscribe({
      next: (response) => {
        this.comments = [...response];
        this._changeDetection.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching comments:', error);
      },
    });
  }

  onAddComment() {
    this._dialogService.openDialogCommentTask(this.id).subscribe((result) => {
      if (result) {
        this.fetchTaskComments();
      }
    });
  }

  onSendToUser(data: TasksComments | null) {
    let send: string | undefined;

    if (data?.userId?.id) {
      send = data.userId.id;
    } else if (this.task?.assignedId?.id) {
      send = this.task.assignedId.id;
    }

    if (send) {
      this._router.navigateByUrl(`/dashboard/user/${send}`);
    }
  }

  onStatusChange(event: any) {
    console.log(event);
    this._dialogService
      .openDialogValidateChange(
        `Changing "${this.task.status}" to "${event}" is something you would like to do.`
      )
      .subscribe((result) => {
        if (result === true) {
          this.task.status = event;
          this._taskService.putTaskById(this.task.id, this.task).subscribe({
            next: (response) => {
              this.task = response;
              this._changeDetection.detectChanges();
            },
            error: (error) => {
              console.log(error);
            },
          });
        }
      });
  }
}
