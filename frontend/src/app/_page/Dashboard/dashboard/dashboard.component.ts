import { Component, ViewChild } from '@angular/core';
import { Card } from '../../../_model/_common/card';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from '../../../_components/card/card.component';
import { CommonModule } from '@angular/common';
import { NamePage } from '../../../_model/_common/name-page';
import { NamePageComponent } from '../../../_components/name-page/name-page.component';
import { MatCardModule } from '@angular/material/card';
import { JwtService } from '../../../_service/_http/jwt.service';
import { RolesLogicallyService } from '../../../_shared/roles-logically.service';
import { SpinnerComponent } from '../../../_service/_spinner/spinner/spinner.component';
import { ExcelExportService } from '../../../_service/_excel/excel.service';
import { ProcessLogService } from '../../../_service/_model/process-log.service';
import { Router } from '@angular/router';
import { SortPage } from '../../../_model/_common/sort-page';
import { TableColumn } from '../../../_model/_common/table-column';
import { ChangePage } from '../../../_model/_common/change-page';
import { Environment } from '../../../../environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProcessLog } from '../../../_model/_interface/process-log';
import { TableComponent } from '../../../_components/table/table.component';
import { QualityChecksService } from '../../../_service/_model/quality-checks.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HttpClientModule,
    CardComponent,
    CommonModule,
    NamePageComponent,
    MatCardModule,
    TableComponent,
    SpinnerComponent,
  ],
  providers: [
    JwtService,
    RolesLogicallyService,
    ProcessLogService,
    QualityChecksService,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  data!: ProcessLog[];
  count!: number;
  cards: Card[] = [];

  page: NamePage = {
    name: 'Dashboard Overview',
    icon: 'folder_open',
  };

  columns: TableColumn[] = [
    { key: 'status', code: 'p.status', label: 'Status', type: 'text' },
    {
      key: 'process_id.name',
      code: 'p.process_id.name',
      label: 'Process',
      type: 'text',
    },
    {
      key: 'machine_id.name',
      code: 'p.machine_id.name',
      label: 'Machine',
      type: 'text',
    },
    {
      key: 'start_time',
      code: 'p.start_time',
      label: 'Start Date',
      pipe: 'date',
      isActive: false,
    },
    {
      key: 'end_time',
      code: 'p.end_time',
      label: 'End Date',
      pipe: 'date',
      isActive: true,
    },
    {
      key: 'view',
      code: 'view',
      label: 'View',
      type: 'button',
      buttons: [
        {
          icon: 'data_usage',
          buttonColor: 'primary',
          onClick: (row: ProcessLog) => {},
        },
        {
          icon: 'area_chart',
          buttonColor: 'primary',
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

  constructor(
    private _rolesLogically: RolesLogicallyService,
    private _excelService: ExcelExportService,
    private _JwtService: JwtService,
    private _processLogService: ProcessLogService,
    private _qualityChecksService: QualityChecksService,
    private _router: Router
  ) {
    this._qualityChecksService
      .getDataByUserNameAndStatus(
        this._JwtService.getUserInfo()?.name!,
        this.changePage,
        this.sortPage
      )
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this._processLogService
      .getDataByUserNameAndStatus(
        this._JwtService.getUserInfo()?.name!,
        null,
        this.changePage,
        this.sortPage
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

  onSortChanged(sort: any) {
    this.sortPage = sort;
    this.fetchData();
  }

  onPageChanged(page: any) {
    this.changePage = page;
    this.fetchData();
  }

  onExport() {
    this._processLogService
      .getExcelByUserNameAndStatus(
        this._JwtService.getUserInfo()?.name!,
        null,
        this.columns
          .filter((c) => c.type !== 'button')
          .map((c) => c.code)
          .join(', ')
      )
      .subscribe({
        next: (response) => {
          this._excelService.exportToExcel(
            this.columns.filter((c) => c.type !== 'button').map((c) => c.label),
            response,
            'Process Logs ' + new Date().toLocaleDateString()
          );
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
