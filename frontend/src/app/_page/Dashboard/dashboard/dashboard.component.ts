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
import { UserInformationDTO } from '../../../_model/_dto/user-information-dto';
import { UserService } from '../../../_service/_model/user.service';
import { CarsService } from '../../../_service/_model/cars.service';
import { Cars } from '../../../_model/_interface/car';
import { QualityChecks } from '../../../_model/_interface/quality-checks';
import { MachineService } from '../../../_service/_model/machine.service';
import { DialogService } from '../../../_service/_dialog/dialog.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProcessLogsFilterDTO } from '../../../_model/_dto/process-log-filter-dto';
import { ProcessLogStatus } from '../../../_model/_enum/process-log-status';
import { CarsFiltersDTO } from '../../../_model/_dto/cars-filter-dto';
import { QualityChecksFiltersDTO } from '../../../_model/_dto/quality-check-filter-dto';
import { CarsPartsFilterDTO } from '../../../_model/_dto/cars-parts-filter-dto';
import { CarsPartsService } from '../../../_service/_model/cars-parts.service';
import { response } from 'express';
import { CarsParts } from '../../../_model/_interface/cars-parts';
import { PartCategory } from '../../../_model/_enum/part-category';

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
    CarsPartsService,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  data!: ProcessLog[] | Cars[] | QualityChecks[] | CarsParts[];
  count!: number;
  card!: Card;
  type: boolean = true;
  form!: { [key: string]: FormGroup };
  keys: string[] = ['Process Logs', 'Cars', 'Quality Checks', 'Assigned Parts'];

  cards: Card[] = [
    {
      name: this.keys[0],
      count: 0,
      icon: ICONS.PROCESS,
      color: 'green',
    },
    { name: this.keys[1], count: 0, icon: ICONS.CAR, color: 'blue' },
    {
      name: this.keys[2],
      count: 0,
      icon: ICONS.QUALITY_CHECKS,
      color: 'purple',
    },
    {
      name: this.keys[3],
      count: 0,
      icon: ICONS.PARTS,
      color: 'orange',
    },
  ];

  page: NamePage = {
    name: 'Dashboard Overview',
    icon: ICONS.FEET,
  };

  columnsSettings: {
    [key: string]: TableColumn[];
  } = {
    [this.keys[0]]: [
      {
        key: 'status',
        code: 'p.status',
        label: 'Status',
        type: 'text',
        config: {
          type: 'select',
          placeholder: 'Status',
          formControlName: 'status',
          options: ['NONE', ...Object.keys(ProcessLogStatus)],
          labelKey: null,
          valueKey: null,
        },
      },
      {
        key: 'process_id.name',
        code: 'p.process_id.name',
        label: 'Process',
        type: 'text',
        config: {
          type: 'text',
          placeholder: 'Process',
          formControlName: 'process_id',
        },
      },
      {
        key: 'machine_id.name',
        code: 'p.machine_id.name',
        label: 'Machine',
        type: 'text',
        config: {
          type: 'text',
          placeholder: 'Machine',
          formControlName: 'machine_id',
        },
      },
      {
        key: 'start_time',
        code: 'p.start_time',
        label: 'Start Date',
        pipe: 'date',
        isActive: false,
        config: {
          type: 'date',
          placeholder: 'Start Date',
          formControlName: 'start_time',
        },
      },
      {
        key: 'end_time',
        code: 'p.end_time',
        label: 'End Date',
        pipe: 'date',
        isActive: true,
        config: {
          type: 'date',
          placeholder: 'End Date',
          formControlName: 'end_time',
        },
      },
      {
        key: 'view',
        code: 'view',
        label: 'View',
        type: 'button',
        activeFilters: true,
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
    [this.keys[1]]: [
      {
        key: 'model_id.name',
        code: 'c.model_id.name',
        label: 'Name',
        type: 'text',
        config: {
          type: 'text',
          placeholder: 'Name',
          formControlName: 'model_id_name',
        },
      },
      {
        key: 'model_id.generation',
        code: 'c.model_id.generation',
        label: 'Generation',
        type: 'text',
        config: {
          type: 'text',
          placeholder: 'Generation',
          formControlName: 'model_id_generation',
        },
      },
      {
        key: 'vin',
        code: 'c.vin',
        label: 'VIN',
        type: 'text',
        config: {
          type: 'text',
          placeholder: 'VIN',
          formControlName: 'vin',
        },
      },
      {
        key: 'status',
        code: 'c.status',
        label: 'Status',
        type: 'text',
        config: {
          type: 'text',
          placeholder: 'Status',
          formControlName: 'status',
        },
      },
      {
        key: 'model_id.release_year',
        code: 'c.model_id.release_year',
        label: 'Release Year',
        type: 'text',
        config: {
          type: 'number',
          placeholder: 'Release Year',
          formControlName: 'model_id_release_year',
        },
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
    [this.keys[2]]: [
      {
        key: 'car_id.model_id.name',
        code: 'qc.car_id.model_id.name',
        label: 'Name',
        type: 'text',
        config: {
          type: 'text',
          placeholder: 'Name',
          formControlName: 'car_id_model_id_name',
        },
      },
      {
        key: 'car_id.model_id.generation',
        code: 'qc.car_id.model_id.generation',
        label: 'Generation',
        type: 'text',
        config: {
          type: 'text',
          placeholder: 'Generation',
          formControlName: 'car_id_model_id_generation',
        },
      },
      {
        key: 'car_id.model_id.release_year',
        code: 'qc.car_id.model_id.release_year',
        label: 'Release Year',
        type: 'text',
        config: {
          type: 'number',
          placeholder: 'Release Year',
          formControlName: 'car_id_model_id_release_year',
        },
      },
      {
        key: 'inspector_id.name',
        code: 'qc.inspector_id.name',
        label: 'Inspector',
        type: 'text',
        config: {
          type: 'text',
          placeholder: 'Inspector',
          formControlName: 'inspector_id_name',
        },
      },
      {
        key: 'check_date',
        code: 'qc.check_date',
        label: 'Check Date',
        pipe: 'date',
        config: {
          type: 'date',
          placeholder: 'Check Date',
          formControlName: 'check_date',
        },
      },
      {
        key: 'passed',
        code: 'qc.passed',
        label: 'Passed',
        passed: true,
        config: {
          type: 'select',
          placeholder: 'Passed',
          formControlName: 'passed',
          options: ['NONE', 'TRUE', 'FALSE'],
          labelKey: null,
          valueKey: null,
        },
      },
    ],
    [this.keys[3]]: [
      {
        key: 'car_id.model_id.name',
        code: 'cp.car_id.model_id.name',
        label: 'Car Name',
        type: 'text',
        config: {
          type: 'text',
          placeholder: 'Car Name',
          formControlName: 'car_id_model_id_name',
        },
      },
      {
        key: 'part_id.name',
        code: 'cp.part_id.name',
        label: 'Part Name',
        type: 'text',
        config: {
          type: 'text',
          placeholder: 'Part Name',
          formControlName: 'part_id_name',
        },
      },
      {
        key: 'part_id.category',
        code: 'cp.part_id.category',
        label: 'Part Category',
        type: 'text',
        config: {
          type: 'select',
          options: ['NONE', ...Object.keys(PartCategory)],
          labelKey: null,
          valueKey: null,
          placeholder: 'Part Category',
          formControlName: 'part_id_category',
        },
      },
      {
        key: 'installed_by.name',
        code: 'cp.installed_by.name',
        label: 'Installed',
        type: 'text',
        config: {
          type: 'text',
          placeholder: 'Installed',
          formControlName: 'installed_by_name',
        },
      },
      {
        key: 'quantity',
        code: 'cp.quantity',
        label: 'Quantity',
        type: 'text',
        config: {
          type: 'number',
          placeholder: 'Quantity',
          formControlName: 'quantity',
        },
      },
      {
        key: 'part_id.unit_cost',
        code: 'cp.part_id.unit_cost',
        label: 'Part unit_cost',
        type: 'text',
        config: {
          type: 'number',
          placeholder: 'Part unit_cost',
          formControlName: 'part_id_unit_cost',
        },
      },
    ],
  };

  cardSettings: {
    [key: string]: {
      sortPage: SortPage;
      changePage: ChangePage;
    };
  } = {
    [this.keys[0]]: {
      sortPage: {
        column: this.columnsSettings[this.keys[0]][0].key,
        direction: '',
      },
      changePage: { pageIndex: 0, pageSize: Environment.pageSize },
    },
    [this.keys[1]]: {
      sortPage: {
        column: this.columnsSettings[this.keys[1]][0].key,
        direction: '',
      },
      changePage: { pageIndex: 0, pageSize: Environment.pageSize },
    },
    [this.keys[2]]: {
      sortPage: {
        column: this.columnsSettings[this.keys[2]][0].key,
        direction: '',
      },
      changePage: { pageIndex: 0, pageSize: Environment.pageSize },
    },
    [this.keys[3]]: {
      sortPage: {
        column: this.columnsSettings[this.keys[3]][0].key,
        direction: '',
      },
      changePage: { pageIndex: 0, pageSize: Environment.pageSize },
    },
  };

  constructor(
    private _excelService: ExcelExportService,
    private _JwtService: JwtService,
    private _processLogService: ProcessLogService,
    private _qualityChecksService: QualityChecksService,
    private _carsService: CarsService,
    private _userService: UserService,
    private _carsPartsService: CarsPartsService,
    private _dialogService: DialogService,
    private _fb: FormBuilder
  ) {
    this.onDefaultForms();
    this._userService
      .countInformationByUserName(this._JwtService.getUserInfo()?.name!)
      .subscribe({
        next: (response: UserInformationDTO) => {
          this.cards[0].count = response.countProcessLog;
          this.cards[1].count = response.countCars;
          this.cards[2].count = response.countQualityChecks;
          this.cards[3].count = response.countAssignedParts;
        },
        error: (error: Error) => {
          console.error(error);
        },
      });
  }

  ngOnInit() {
    this.onCardClick(this.cards[3]);
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
      case this.keys[0]: {
        this._processLogService
          .postExcelByUserNameAndProcessLogFilters(
            this._JwtService.getUserInfo()?.name!,
            columns.join(', '),
            this.onGiveFilters()! as ProcessLogsFilterDTO
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
      case this.keys[1]: {
        this._carsService
          .postExcelByUserNameAncCarsFilter(
            this._JwtService.getUserInfo()?.name!,
            columns.join(', '),
            this.onGiveFilters()! as CarsFiltersDTO
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
      case this.keys[2]: {
        this._qualityChecksService
          .postExcelByUserNameAndQualityChecksFilters(
            this._JwtService.getUserInfo()?.name!,
            columns.join(', '),
            this.onGiveFilters()! as QualityChecksFiltersDTO
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
      case this.keys[3]: {
        this._carsPartsService
          .getExcelByUserNameAndCarsPartsFilters(
            this._JwtService.getUserInfo()?.name!,
            columns.join(', '),
            this.onGiveFilters()! as CarsPartsFilterDTO
          )
          .subscribe({
            next: (response) => {
              this._excelService.exportToExcel(
                tables,
                response,
                'Cars_Parts' + new Date().toLocaleDateString()
              );
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

    switch (card.name) {
      case this.keys[0]: {
        this._processLogService
          .postDataByUserNameAndProcessLogFilters(
            userName,
            settings.changePage,
            settings.sortPage,
            this.onGiveFilters()! as ProcessLogsFilterDTO
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
      case this.keys[1]: {
        this._carsService
          .postDataByUserNameAndCarsFilters(
            userName,
            settings.changePage,
            settings.sortPage,
            this.onGiveFilters()! as CarsFiltersDTO
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
      case this.keys[2]: {
        this._qualityChecksService
          .postDataByUserNameAndQualityChecksFilters(
            userName,
            settings.changePage,
            settings.sortPage,
            this.onGiveFilters()! as QualityChecksFiltersDTO
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
      case this.keys[3]: {
        this._carsPartsService
          .postDataByUserNameAndCarsPartsFilters(
            userName,
            settings.changePage,
            settings.sortPage,
            this.onGiveFilters()! as CarsPartsFilterDTO
          )
          .subscribe({
            next: (response) => {
              this.data = [...response.items];
              this.count = response.count;
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

  onForms() {
    return this.form[this.card.name];
  }

  onActivateFilters() {
    this.cardSettings[this.keys[0]].changePage.pageIndex = 0;
    this.onCardClick(this.card);
  }

  onGetPageIndex(): number {
    return this.cardSettings[this.card.name].changePage.pageIndex;
  }

  private onGiveFilters():
    | ProcessLogsFilterDTO
    | CarsFiltersDTO
    | QualityChecksFiltersDTO
    | CarsPartsFilterDTO
    | null {
    if (this.card.name === this.keys[0]) {
      return {
        status:
          this.form[this.keys[0]].value.status === '' ||
          this.form[this.keys[0]].value.status === 'NONE'
            ? null
            : this.form[this.keys[0]].value.status,
        process_id_name:
          this.form[this.keys[0]].value.process_id === ''
            ? null
            : this.form[this.keys[0]].value.process_id,
        machine_id_name:
          this.form[this.keys[0]].value.machine_id === ''
            ? null
            : this.form[this.keys[0]].value.machine_id,
        start_date:
          this.form[this.keys[0]].value.start_time === ''
            ? null
            : this.form[this.keys[0]].value.start_time,
        end_date:
          this.form[this.keys[0]].value.end_time === ''
            ? null
            : this.form[this.keys[0]].value.end_time,
      };
    } else if (this.card.name === this.keys[1]) {
      return {
        model_id_release_year:
          this.form[this.keys[1]].value.model_id_release_year === ''
            ? null
            : this.form[this.keys[1]].value.model_id_release_year,
        status:
          this.form[this.keys[1]].value.status === ''
            ? null
            : this.form[this.keys[1]].value.status,
        vin:
          this.form[this.keys[1]].value.vin === ''
            ? null
            : this.form[this.keys[1]].value.vin,
        model_id_generation:
          this.form[this.keys[1]].value.model_id_generation === ''
            ? null
            : this.form[this.keys[1]].value.model_id_generation,
        model_id_name:
          this.form[this.keys[1]].value.model_id_name === ''
            ? null
            : this.form[this.keys[1]].value.model_id_name,
      };
    } else if (this.card.name === this.keys[2]) {
      return {
        car_id_model_id_name:
          this.form[this.keys[2]].value.car_id_model_id_name === ''
            ? null
            : this.form[this.keys[2]].value.car_id_model_id_name,
        car_id_model_id_generation:
          this.form[this.keys[2]].value.car_id_model_id_generation === ''
            ? null
            : this.form[this.keys[2]].value.car_id_model_id_generation,
        car_id_model_id_release_year:
          this.form[this.keys[2]].value.car_id_model_id_release_year === ''
            ? null
            : this.form[this.keys[2]].value.car_id_model_id_release_year,
        inspector_id_name:
          this.form[this.keys[2]].value.inspector_id_name === ''
            ? null
            : this.form[this.keys[2]].value.inspector_id_name,
        check_date:
          this.form[this.keys[2]].value.check_date === ''
            ? null
            : this.form[this.keys[2]].value.check_date,
        passed:
          this.form[this.keys[2]].value.passed === '' ||
          this.form[this.keys[2]].value.passed === 'NONE'
            ? null
            : this.form[this.keys[2]].value.passed,
      };
    } else if (this.card.name === this.keys[3]) {
      return {
        part_id_unit_cost:
          this.form[this.keys[3]].value.part_id_unit_cost === ''
            ? null
            : this.form[this.keys[3]].value.part_id_unit_cost,
        quantity:
          this.form[this.keys[3]].value.quantity === ''
            ? null
            : this.form[this.keys[3]].value.quantity,
        installed_by_name:
          this.form[this.keys[3]].value.installed_by_name === ''
            ? null
            : this.form[this.keys[3]].value.installed_by_name,
        part_id_category:
          this.form[this.keys[3]].value.part_id_category === '' ||
          this.form[this.keys[3]].value.part_id_category === 'NONE'
            ? null
            : this.form[this.keys[3]].value.part_id_category,
        part_id_name:
          this.form[this.keys[3]].value.part_id_name === ''
            ? null
            : this.form[this.keys[3]].value.part_id_name,
        car_id_model_id_name:
          this.form[this.keys[3]].value.car_id_model_id_name === ''
            ? null
            : this.form[this.keys[3]].value.car_id_model_id_name,
      };
    }

    return null;
  }

  private onDefaultForms() {
    this.form = {
      [this.keys[0]]: this._fb.group({
        status: ['NONE'],
        process_id: [null],
        machine_id: [null],
        start_time: [null],
        end_time: [null],
      }),
      [this.keys[1]]: this._fb.group({
        model_id_release_year: [null],
        status: [null],
        vin: [null],
        model_id_generation: [null],
        model_id_name: [null],
      }),
      [this.keys[2]]: this._fb.group({
        car_id_model_id_name: [null],
        car_id_model_id_generation: [null],
        car_id_model_id_release_year: [null],
        inspector_id_name: [null],
        check_date: [null],
        passed: ['NONE'],
      }),
      [this.keys[3]]: this._fb.group({
        part_id_unit_cost: [null],
        quantity: [null],
        installed_by_name: [null],
        part_id_category: ['NONE'],
        part_id_name: [null],
        car_id_model_id_name: [null],
      }),
    };
  }
}
