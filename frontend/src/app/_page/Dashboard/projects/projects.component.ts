import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ProjectsService } from '../../../_service/_model/projects.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { Projects } from '../../../_model/_interface/projects';
import { NamePageComponent } from '../../../_components/name-page/name-page.component';
import { NamePage } from '../../../_model/_common/name-page';
import { TableComponent } from '../../../_components/table/table.component';
import { TableColumn } from '../../../_model/_common/table-column';
import { JwtService } from '../../../_service/_http/jwt.service';
import { dir, error, table } from 'console';
import { SortPage } from '../../../_model/_common/sort-page';
import { ChangePage } from '../../../_model/_common/change-page';
import { Environment } from '../../../../environments/environment';
import { GroupResult } from '../../../_model/_common/group-result';
import { DialogService } from '../../../_service/_dialog/dialog.service';
import { TasksService } from '../../../_service/_model/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';
import { ExcelExportService } from '../../../_service/_excel/excel.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    NamePageComponent,
    TableComponent,
    MatCardModule,
    HttpClientModule,
  ],
  providers: [ProjectsService],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  columns: TableColumn[] = [
    { key: 'name', code: 'pm.projectId.name', label: 'Name', type: 'text' },
    {
      key: 'categoryId.name',
      code: 'pm.projectId.categoryId.name',
      label: 'Category',
      type: 'text',
    },
    {
      key: 'status',
      code: 'pm.projectId.status',
      label: 'Status',
      type: 'text',
    },
    {
      key: 'startDate',
      code: 'pm.projectId.startDate',
      label: 'Start Date',
      pipe: 'date',
    },
    {
      key: 'endDate',
      code: 'pm.projectId.endDate',
      label: 'End Date',
      pipe: 'date',
    },
    {
      key: 'managerId.name',
      code: 'pm.projectId.managerId.name',
      label: 'Manager',
      type: 'link',
      link: {
        url: '/dashboard/user',
        code: 'managerId.id',
      },
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

  data!: Projects[];
  count!: number;
  page: NamePage = {
    name: 'Projects Overview',
    icon: 'folder_open',
  };

  suggestion!: string;
  constructor(
    private _router: Router,
    private _projectsService: ProjectsService,
    private _jwtService: JwtService,
    private _dialogService: DialogService,
    private _route: ActivatedRoute,
    private _excelService: ExcelExportService
  ) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe((params) => {
      this.suggestion = params.get('suggestion')!;
      this.fetchData();
    });
    this.fetchData();
  }

  onViewChart(row: Projects) {
    this._dialogService.openDialogViewChart(row.id, 'PROJECT');
  }

  onPageChanged(event: ChangePage) {
    this.changePage = event;
    this.fetchData();
  }

  onSortChanged(event: SortPage) {
    this.sortPage = event;
    this.fetchData();
  }

  private fetchData() {
    if (this.suggestion === undefined || this.suggestion === null) {
      this._projectsService
        .postDataOfProjectsByUserEmail(
          this._jwtService.getEmail(),
          this.sortPage,
          this.changePage
        )
        .subscribe({
          next: (response: GroupResult<Projects>) => {
            this.data = response.items;
            this.count = response.count;
          },
          error: (err) => {
            console.error(err);
          },
        });
    } else {
      this._projectsService
        .postDataOfProjectsBySuggestion(
          this.suggestion,
          this.sortPage,
          this.changePage
        )
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
  }

  onDblClickRow(event: any) {
    this._router.navigateByUrl(`/dashboard/project/${event.id}`);
  }

  onExport() {
    this._projectsService
      .getExcelDataOfProjectsByUserEmailAndStatus(
        this.columns
          .filter((c) => c.type !== 'button')
          .map((c) => c.code)
          .join(', '),
        this._jwtService.getEmail(),
        this.suggestion
      )
      .subscribe({
        next: (response) => {
          this._excelService.exportToExcel(
            this.columns.filter((c) => c.type !== 'button').map((c) => c.label),
            response,
            'Projects'
          );
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
