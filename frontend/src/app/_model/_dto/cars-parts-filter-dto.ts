import { PartCategory } from '../_enum/part-category';

export interface CarsPartsFilterDTO {
  part_id_unit_cost: number;
  quantity: number;
  installed_by_name: string;
  part_id_category: PartCategory;
  part_id_name: string;
  car_id_model_id_name: string;
}
