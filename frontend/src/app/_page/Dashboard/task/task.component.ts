import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../../_service/_model/tasks.service';
import { MatCardModule } from '@angular/material/card';
import { Tasks } from '../../../_model/_interface/tasks';
import { CommonModule, DatePipe } from '@angular/common';
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
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './task.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    private _projectService: ProjectsService,
    private _subTasksService: SubTasksService,
    private _taskComments: TasksCommentsService,
    private _dialogService: DialogService,
    private _fb: FormBuilder
  ) {
    this._route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this._taskService.getById(this.id).subscribe({
      next: (response) => {
        this.task = response;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.fetchTaskComments();

    this._taskComments.getListByTaskId(this.id).subscribe({
      next: (response) => {
        this.comments = response;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.fetchTable();
  }

  ngAfterViewInit(): void {
    this.form = this._fb.group({
      status: [this.task.status],
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
          console.log(error);
        },
      });
  }

  private fetchTaskComments() {
    this._taskComments.getListByTaskId(this.id).subscribe({
      next: (response) => {
        this.comments = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onAddComment() {
    this._dialogService.openDialogCommentTask(this.id).subscribe((result) => {
      if (result !== undefined) {
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

    this._router.navigateByUrl(`/dashboard/user/${send}`);
  }

  onStatusChange(event: any) {
    console.log(event);
  }
}
