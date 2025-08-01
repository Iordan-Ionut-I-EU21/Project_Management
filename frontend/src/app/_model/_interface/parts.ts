import { PartCategory } from '../_enum/part-category';

export interface Parts {
  id: string;
  name: string;
  category: PartCategory;
  unit_cost: number;
}
