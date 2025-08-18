import { PartCategory } from '../_enum/part-category';

export interface Parts {
  id: string;
  name: string;
  category: PartCategory;
  unit_cost: number;
}
export function isParts(obj: any): obj is Parts {
  return (
    obj &&
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.unit_cost === 'number'
  );
}
