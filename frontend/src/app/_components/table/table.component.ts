import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { TableColumn } from '../../_model/_common/table-column';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { SortPage } from '../../_model/_common/sort-page';
import { ChangePage } from '../../_model/_common/change-page';
import { Environment } from '../../../environments/environment';
import { Router, RouterModule } from '@angular/router';
import { IsNearEndDatePipe } from '../../_model/_pipe/isNearEndDate.pipe';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    DatePipe,
    RouterModule,
    IsNearEndDatePipe,
  ],
  providers: [DatePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() count: number = 0;
  @Input() enableDblClickForRow: boolean = false;
  @Output() pageChanged = new EventEmitter<ChangePage>();
  @Output() sortChanged = new EventEmitter<SortPage>();
  @Output() onDblClickRow = new EventEmitter<any>();
  @Output() onExport = new EventEmitter();

  dataSource = new MatTableDataSource<any>();
  displayedColumnKeys: string[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pageSize: number = Environment.pageSize;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.dataSource.data = changes['data'].currentValue;
    }
  }

  constructor(private _cdr: ChangeDetectorRef, private _router: Router) {}

  ngOnInit() {
    this.displayedColumnKeys = this.columns.map((c) => c.code);
  }

  ngAfterViewInit() {
    this.dataSource.data = this.data;
    this._cdr.detectChanges();

    this.paginator.page.subscribe((pageEvent) => {
      this.pageChanged.emit({
        pageIndex: pageEvent.pageIndex,
        pageSize: pageEvent.pageSize,
      });
    });

    this.sort.sortChange.subscribe((sortEvent) => {
      console.log('Sort changed:', sortEvent);
      if (sortEvent.active !== 'view') {
        this.sortChanged.emit({
          column: sortEvent.active,
          direction: sortEvent.direction,
        });
      }
    });
  }

  onRowDoubleClick(event: any) {
    this.onDblClickRow.emit(event);
  }

  canDoubleClick(row: any): boolean {
    return row.id === true;
  }

  getNestedValue(row: any, key: string): any {
    return key.split('.').reduce((acc, part) => (acc ? acc[part] : null), row);
  }

  onGoToLink(row: any, link: string | undefined, code: string | undefined) {
    if (!link || !row?.id || !code) {
      console.warn('Invalid link or row ID:', { link, row });
      return;
    }
    const targetUrl = `${link}/${this.getNestedValue(row, code!)}`;
    console.log('Navigating to:', targetUrl);
    this._router.navigateByUrl(targetUrl);
  }

  export() {
    this.onExport.emit();
  }
}
