import { ChangePage } from '../_common/change-page';
import { SortPage } from '../_common/sort-page';
import { CarsFiltersDTO } from './cars-filter-dto';
import { CarsPartsFilterDTO } from './cars-parts-filter-dto';
import { ProcessLogsFilterDTO } from './process-log-filter-dto';
import { QualityChecksFiltersDTO } from './quality-check-filter-dto';

export interface FindByRequestDTO {
  tableRequest?: TableRequest;
  processLogsFilterDTO?: ProcessLogsFilterDTO;
  carsFiltersDTO?: CarsFiltersDTO;
  qualityChecksFiltersDTO?: QualityChecksFiltersDTO;
  carsPartsFiltersDTO?: CarsPartsFilterDTO;
}

export interface TableRequest {
  changePage: ChangePage;
  sortPage: SortPage;
}
