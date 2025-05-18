import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Items per page:';
  override nextPageLabel = '';
  override previousPageLabel = '';
  override firstPageLabel = 'First page';
  override lastPageLabel = 'Last page';

  override getRangeLabel = (page: number, pageSize: number, length: number) =>
    `${page * pageSize + 1} - ${Math.min(
      (page + 1) * pageSize,
      length
    )} of ${length}`;
}
