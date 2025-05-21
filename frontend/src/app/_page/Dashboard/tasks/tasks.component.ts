import { Component, ViewChild } from '@angular/core';
import { TableColumn } from '../../../_model/_common/table-column';
import { MatCardModule } from '@angular/material/card';
import { TableComponent } from '../../../_components/table/table.component';
import { NamePageComponent } from '../../../_components/name-page/name-page.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SortPage } from '../../../_model/_common/sort-page';
import { ChangePage } from '../../../_model/_common/change-page';
import { Environment } from '../../../../environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NamePage } from '../../../_model/_common/name-page';
import { TasksService } from '../../../_service/_model/tasks.service';
import { JwtService } from '../../../_service/_http/jwt.service';
import { DialogService } from '../../../_service/_dialog/dialog.service';
import { Tasks } from '../../../_model/_interface/tasks';
import { Status } from '../../../_model/_enum/status';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    NamePageComponent,
    TableComponent,
    MatCardModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  columns: TableColumn[] = [
    { key: 'title', code: 't.title', label: 'Title', type: 'text' },
    {
      key: 'priority',
      code: 't.priority',
      label: 'Priority',
      type: 'text',
    },
    {
      key: 'status',
      code: 'pm.projectId.status',
      label: 'Status',
      type: 'text',
    },
    {
      key: 'createdAt',
      code: 't.createdAt',
      label: 'Start Date',
      pipe: 'date',
    },
    {
      key: 'dueDate',
      code: 't.dueDate',
      label: 'End Date',
      pipe: 'date',
    },
    {
      key: 'projectId.name',
      code: 't.projectId.name',
      label: 'Project',
      type: 'text',
    },
    {
      key: 'edit',
      code: 'pm.edit',
      label: 'Edit',
      type: 'button',
      buttons: [
        {
          icon: 'pie_chart',
          onClick: (row) => this.onViewChart(row),
        },
      ],
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

  data!: Tasks[];
  count!: number;
  page: NamePage = {
    name: 'Tasks Overview',
    icon: 'list_alt',
  };

  constructor(
    private _tasksService: TasksService,
    private _jwtService: JwtService,
    private _dialogService: DialogService,
    private _router: Router
  ) {
    this.fetchData();
  }

  onViewChart(row: Tasks) {
    this._dialogService.openDialogViewChart(row.projectId.id, 'PROJECT');
  }

  onSortChanged(sort: SortPage) {
    this.sortPage = sort;
    this.fetchData();
  }

  onPageChanged(page: ChangePage) {
    this.changePage = page;
    this.fetchData();
  }

  onDblClickRow(event: any) {
    console.log(event);
    this._router.navigateByUrl(`/dashboard/task/${event.id}`);
  }

  fetchData() {
    this._tasksService
      .postDataOfProjectsByUserEmailAndStatus(
        this._jwtService.getEmail(),
        Status.PENDING,
        this.sortPage,
        this.changePage
      )
      .subscribe({
        next: (response) => {
          this.data = response.items;
          this.count = response.count;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
