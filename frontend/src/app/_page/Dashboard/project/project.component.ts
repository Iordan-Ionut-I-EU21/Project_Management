import { Component, ViewChild } from '@angular/core';
import { ProjectsService } from '../../../_service/_model/projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SortPage } from '../../../_model/_common/sort-page';
import { TableColumn } from '../../../_model/_common/table-column';
import { ChangePage } from '../../../_model/_common/change-page';
import { Environment } from '../../../../environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Tasks } from '../../../_model/_interface/tasks';
import { NamePage } from '../../../_model/_common/name-page';
import { response } from 'express';
import { DialogService } from '../../../_service/_dialog/dialog.service';
import { TableComponent } from '../../../_components/table/table.component';
import { NamePageComponent } from '../../../_components/name-page/name-page.component';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [TableComponent, NamePageComponent, MatCard],
  providers: [ProjectsService, DialogService],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent {
  id!: string;

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
      key: 'assignedId.name',
      code: 't.assignedId.name',
      label: 'Assigned',
      type: 'link',
      link: { url: '/dashboard/user', code: 'assignedId.id' },
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
    name: 'Project Task Overview',
    icon: 'list_alt',
  };

  constructor(
    private _projectService: ProjectsService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _dialogService: DialogService
  ) {
    this._route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.fetchData();
  }

  onSortChanged(sort: any) {
    this.sortPage = sort;
    this.fetchData();
  }

  onPageChanged(page: any) {
    this.changePage = page;
    this.fetchData();
  }

  onViewChart() {
    this._dialogService.openDialogViewChart(this.id, 'PROJECT');
  }

  onDblClickRow(event: any) {
    this._router.navigateByUrl(`/dashboard/task/${event.id}`);
  }

  private fetchData() {
    this._projectService
      .getListByProjectId(this.id, this.sortPage, this.changePage)
      .subscribe({
        next: (response) => {
          this.data = response.items;
          this.count = response.count;
        },
        error(err) {
          console.log(err);
        },
      });
  }
}
