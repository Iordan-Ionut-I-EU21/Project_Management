import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NamePage } from '../../../_model/_common/name-page';
import { ICONS } from '../../../_shared/icons';
import { Card } from '../../../_model/_common/card';
import { JwtService } from '../../../_service/_http/jwt.service';
import { SortPage } from '../../../_model/_common/sort-page';
import { ChangePage } from '../../../_model/_common/change-page';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProcessLog } from '../../../_model/_interface/process-log';
import { Cars } from '../../../_model/_interface/car';
import { QualityChecks } from '../../../_model/_interface/quality-checks';
import { CommonModule } from '@angular/common';
import { NamePageComponent } from '../../../_components/name-page/name-page.component';
import { Environment } from '../../../../environments/environment';
import { CardComponent } from '../../../_components/card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { TableComponent } from '../../../_components/table/table.component';
import { SpinnerComponent } from '../../../_service/_spinner/spinner/spinner.component';
import { PartsService } from '../../../_service/_model/parts.service';
import { Process } from '../../../_model/_interface/process';
import { CarsPartsService } from '../../../_service/_model/cars-parts.service';
import { CarsParts } from '../../../_model/_interface/cars-parts';
import { TableColumn } from '../../../_model/_common/table-column';
import { response } from 'express';
import { error } from 'console';
import { ExcelExportService } from '../../../_service/_excel/excel.service';

@Component({
  selector: 'app-employee',
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
  providers: [JwtService, CarsPartsService, ExcelExportService],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  data!: CarsParts[];
  count!: number;
  card!: Card;
  type: boolean = true;

  page: NamePage = {
    name: 'Employee Overview',
    icon: ICONS.EMPLOYEE,
  };
  cards: Card[] = [
    {
      name: 'Assigned Parts',
      count: 0,
      icon: ICONS.PARTS,
      color: 'green',
    },
    {
      name: 'In Production quality checks',
      count: 0,
      icon: ICONS.QUALITY_CHECKS,
      color: 'red',
    },
  ];

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
    private _JwtService: JwtService,
    private _excelService: ExcelExportService,
    private _carsPartsService: CarsPartsService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.columnsSettings = {
      'Assigned Parts': [
        {
          key: 'car_id.model_id.name',
          code: 'cp.car_id.model_id.name',
          label: 'Car Name',
          type: 'text',
        },
        {
          key: 'part_id.name',
          code: 'cp.part_id.name',
          label: 'Part Name',
          type: 'text',
        },
        {
          key: 'part_id.category',
          code: 'cp.part_id.category',
          label: 'Part Category',
          type: 'text',
        },
        {
          key: 'installed_by.name',
          code: 'cp.installed_by.name',
          label: 'Installed',
          type: 'text',
        },
        {
          key: 'quantity',
          code: 'cp.quantity',
          label: 'Quantity',
          type: 'text',
        },
        {
          key: 'part_id.unit_cost',
          code: 'cp.part_id.unit_cost',
          label: 'Part unit_cost',
          type: 'text',
        },
      ],
    };

    this.cardSettings = {
      'Assigned Parts': {
        sortPage: {
          column: this.columnsSettings['Assigned Parts'][0].key,
          direction: '',
        },
        changePage: { pageIndex: 0, pageSize: Environment.pageSize },
      },
    };
    this.onCardClick(this.cards[0]);
  }

  onType(event: boolean) {
    this.type = event;
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

  onExport() {
    const columns = this.onColumns()
      .map((col) => col.code)
      .filter((code) => code && code !== 'view');
    const tables = this.onColumns()
      .map((col) => col.label)
      .filter((label) => label && label !== 'View');
  }

  onSortChanged(sort: any) {
    this.cardSettings[this.card.name].sortPage = { ...sort };
    this.onCardClick(this.card);
  }

  onPageChanged(page: any) {
    this.cardSettings[this.card.name].changePage = { ...page };
    this.onCardClick(this.card);
  }
}
