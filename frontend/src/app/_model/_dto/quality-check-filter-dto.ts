export interface QualityChecksFiltersDTO {
  car_id_model_id_name: string;
  car_id_model_id_generation: number;
  car_id_model_id_release_year: number;
  inspector_id_name: string;
  check_date: Date;
  passed: boolean;
}
