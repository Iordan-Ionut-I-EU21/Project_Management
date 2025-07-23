import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
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
import { ICONS } from '../../../_shared/icons';
import { User } from '../../../_model/_interface/user';
import { UserInformationDTO } from '../../../_model/_dto/user-information-dto';
import { UserService } from '../../../_service/_model/user.service';
import { CarsService } from '../../../_service/_model/cars.service';
import { ProcessLogStatus } from '../../../_model/_enum/process-log-status';
import { Cars } from '../../../_model/_interface/car';
import { QualityChecks } from '../../../_model/_interface/quality-checks';
import { MachineService } from '../../../_service/_model/machine.service';
import { DialogService } from '../../../_service/_dialog/dialog.service';

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
    UserService,
    CarsService,
    MachineService,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  data!: ProcessLog[] | Cars[] | QualityChecks[];
  count!: number;
  card!: Card;
  type: boolean = true;

  cards: Card[] = [
    {
      name: 'Process Logs',
      count: 0,
      icon: ICONS.PROCESS,
      color: 'green',
    },
    { name: 'Cars', count: 0, icon: ICONS.CAR, color: 'blue' },
    {
      name: 'Process Log Status',
      count: 0,
      icon: ICONS.PROCESS,
      color: 'orange',
    },
    {
      name: 'Quality Checks',
      count: 0,
      icon: ICONS.QUALITY_CHECKS,
      color: 'purple',
    },
  ];

  page: NamePage = {
    name: 'Dashboard Overview',
    icon: ICONS.FEET,
  };

  cardSettings!: {
    [key: string]: {
      sortPage: SortPage;
      changePage: ChangePage;
    };
  };

  columnsSettings!: {
    [key: string]: TableColumn[];
  };

  constructor(
    private _rolesLogically: RolesLogicallyService,
    private _excelService: ExcelExportService,
    private _JwtService: JwtService,
    private _processLogService: ProcessLogService,
    private _qualityChecksService: QualityChecksService,
    private _carsService: CarsService,
    private _userService: UserService,
    private _machineService: MachineService,
    private _router: Router,
    private _cdr: ChangeDetectorRef,
    private _dialogService: DialogService
  ) {
    this._userService
      .countInformationByUserName(this._JwtService.getUserInfo()?.name!)
      .subscribe({
        next: (response: UserInformationDTO) => {
          this.cards[0].count = response.countProcessLog;
          this.cards[1].count = response.countCars;
          this.cards[2].count = response.countProcessLogStatus;
          this.cards[3].count = response.countQualityChecks;
        },
        error: (error: Error) => {
          console.error(error);
        },
      });
  }

  ngOnInit() {
    this.columnsSettings = {
      'Process Logs': [
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
              onClick: (row: ProcessLog) => {
                this._dialogService.openDialogViewChart(
                  row,
                  'PROCESS_LOG',
                  'Process Log By Machine'
                );
              },
            },
            {
              icon: 'area_chart',
              buttonColor: 'primary',
              onClick: (row: ProcessLog) => {
                this._dialogService.openDialogViewLine(
                  row,
                  'PROCESS_LOG',
                  'Process Log By Machine'
                );
              },
            },
          ],
        },
      ],
      Cars: [
        {
          key: 'model_id.name',
          code: 'c.model_id.name',
          label: 'Name',
          type: 'text',
        },
        {
          key: 'model_id.generation',
          code: 'c.model_id.generation',
          label: 'Generation',
          type: 'text',
        },
        {
          key: 'vin',
          code: 'c.vin',
          label: 'VIN',
          type: 'text',
        },
        { key: 'status', code: 'c.status', label: 'Status', type: 'text' },
        {
          key: 'model_id.release_year',
          code: 'c.model_id.release_year',
          label: 'Release Year',
          type: 'text',
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
              onClick: (row: ProcessLog) => {
                this._dialogService.openDialogViewChart(
                  row,
                  'CARS',
                  'Cars Count'
                );
              },
            },
          ],
        },
      ],
      'Process Log Status': [
        {
          key: 'car_id.model_id.name',
          code: 'p.car_id.model_id.name',
          label: 'Status',
          type: 'text',
        },
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
              icon: 'area_chart',
              buttonColor: 'primary',
              onClick: (row: ProcessLog) => {
                this._dialogService.openDialogViewChart(
                  row,
                  'PROCESS_LOG',
                  'Process Log By Machine'
                );
              },
            },
            {
              icon: 'area_chart',
              buttonColor: 'primary',
              onClick: (row: ProcessLog) => {
                this._dialogService.openDialogViewLine(
                  row,
                  'PROCESS_LOG',
                  'Process Log By Machine'
                );
              },
            },
          ],
        },
      ],
      'Quality Checks': [
        {
          key: 'car_id.model_id.name',
          code: 'qc.car_id.model_id.name',
          label: 'Name',
          type: 'text',
        },
        {
          key: 'car_id.model_id.generation',
          code: 'qc.car_id.model_id.generation',
          label: 'Generation',
          type: 'text',
        },
        {
          key: 'car_id.model_id.release_year',
          code: 'qc.car_id.model_id.release_year',
          label: 'Release Year',
          type: 'text',
        },
        {
          key: 'inspector_id.name',
          code: 'qc.inspector_id.name',
          label: 'Inspector',
          type: 'text',
        },
        {
          key: 'check_date',
          code: 'qc.check_date',
          label: 'Check Date',
          pipe: 'date',
        },
        {
          key: 'passed',
          code: 'qc.passed',
          label: 'Passed',
          passed: true,
        },
      ],
    };
    this.cardSettings = {
      'Process Logs': {
        sortPage: {
          column: this.columnsSettings['Process Logs'][0].key,
          direction: '',
        },
        changePage: { pageIndex: 0, pageSize: Environment.pageSize },
      },
      Cars: {
        sortPage: {
          column: this.columnsSettings['Process Logs'][0].key,
          direction: '',
        },
        changePage: { pageIndex: 0, pageSize: Environment.pageSize },
      },
      'Process Log Status': {
        sortPage: {
          column: this.columnsSettings['Process Logs'][0].key,
          direction: '',
        },
        changePage: { pageIndex: 0, pageSize: Environment.pageSize },
      },
      'Quality Checks': {
        sortPage: {
          column: this.columnsSettings['Process Logs'][0].key,
          direction: '',
        },
        changePage: { pageIndex: 0, pageSize: Environment.pageSize },
      },
    };
    this.onCardClick(this.cards[0]);
  }

  onSortChanged(sort: any) {
    this.cardSettings[this.card.name].sortPage = { ...sort };
    this.onCardClick(this.card);
  }

  onPageChanged(page: any) {
    this.cardSettings[this.card.name].changePage = { ...page };
    this.onCardClick(this.card);
  }

  onExport() {
    const columns = this.onColumns()
      .map((col) => col.code)
      .filter((code) => code && code !== 'view');
    const tables = this.onColumns()
      .map((col) => col.label)
      .filter((label) => label && label !== 'View');

    switch (this.card.name) {
      case this.cards[0].name: {
        this._processLogService
          .getExcelByUserNameAndStatus(
            this._JwtService.getUserInfo()?.name!,
            null,
            columns.join(', ')
          )
          .subscribe({
            next: (response) => {
              this._excelService.exportToExcel(
                tables,
                response,
                'Process_Logs_' + new Date().toLocaleDateString()
              );
            },
            error: (error) => {
              console.error(error);
            },
          });
        break;
      }
      case this.cards[1].name: {
        this._carsService
          .getExcelByUserNameAndStatus(
            this._JwtService.getUserInfo()?.name!,
            columns.join(', ')
          )
          .subscribe({
            next: (response) => {
              this._excelService.exportToExcel(
                tables,
                response,
                'Cars_' + new Date().toLocaleDateString()
              );
            },
            error: (error) => {
              console.error(error);
            },
          });
        break;
      }
      case this.cards[2].name: {
        this._processLogService
          .getExcelByUserNameAndStatus(
            this._JwtService.getUserInfo()?.name!,
            ProcessLogStatus.IN_PROGRESS,
            columns.join(', ')
          )
          .subscribe({
            next: (response) => {
              this._excelService.exportToExcel(
                tables,
                response,
                'Process_Log_Status_' + new Date().toLocaleDateString()
              );
            },
            error: (error) => {
              console.error(error);
            },
          });
        break;
      }
      case this.cards[3].name: {
        this._qualityChecksService
          .getExcelByUserNameAndStatus(
            this._JwtService.getUserInfo()?.name!,
            columns.join(', ')
          )
          .subscribe({
            next: (response) => {
              this._excelService.exportToExcel(
                tables,
                response,
                'Quality_Checks_' + new Date().toLocaleDateString()
              );
            },
            error: (error) => {
              console.error(error);
            },
          });
        break;
      }
      default: {
        break;
      }
    }
  }

  onCardClick(card: Card) {
    const userName = this._JwtService.getUserInfo()?.name!;
    const settings = this.cardSettings[card.name];

    if (!settings) {
      return;
    }
    this.card = card;
    this.onColumns();
    this._cdr.detectChanges();

    switch (card.name) {
      case this.cards[0].name: {
        this._processLogService
          .getDataByUserNameAndStatus(
            userName,
            null,
            settings.changePage,
            settings.sortPage
          )
          .subscribe({
            next: (response) => {
              this.data = [...response.items];
              this.count = response.count;
            },
            error: (error) => {
              console.error(error);
            },
          });
        break;
      }
      case this.cards[1].name: {
        this._carsService
          .getDataByUserName(userName, settings.changePage, settings.sortPage)
          .subscribe({
            next: (response) => {
              this.data = [...response.items];
              this.count = response.count;
            },
            error: (error) => {
              console.error(error);
            },
          });
        break;
      }
      case this.cards[2].name: {
        this._processLogService
          .getDataByUserNameAndStatus(
            userName,
            ProcessLogStatus.IN_PROGRESS,
            settings.changePage,
            settings.sortPage
          )
          .subscribe({
            next: (response) => {
              this.data = [...response.items];
              this.count = response.count;
            },
            error: (error) => {
              console.error(error);
            },
          });
        break;
      }
      case this.cards[3].name: {
        this._qualityChecksService
          .getDataByUserNameAndStatus(
            userName,
            settings.changePage,
            settings.sortPage
          )
          .subscribe({
            next: (response) => {
              this.data = [...response.items];
              this.count = response.count;
            },
            error: (error) => {
              console.error(error);
            },
          });
        break;
      }
      default: {
        break;
      }
    }
  }

  onColumns(): TableColumn[] {
    if (
      !this.card ||
      !this.card.name ||
      !this.columnsSettings[this.card.name]
    ) {
      return [];
    }

    return this.columnsSettings[this.card.name];
  }

  onType(event: boolean) {
    this.type = event;
  }
}
