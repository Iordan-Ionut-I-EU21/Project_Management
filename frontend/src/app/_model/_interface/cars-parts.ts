import { Cars, isCars } from './car';
import { Employee, isEmployee } from './employee';
import { isParts, Parts } from './parts';

export interface CarsParts {
  id: string;
  quantity: number;
  installed_at: string;
  car_id: Cars;
  part_id: Parts;
  installed_by: Employee;
}

export function isCarsParts(obj: any): obj is CarsParts {
  return (
    obj &&
    typeof obj.id === 'string' &&
    typeof obj.quantity === 'number' &&
    typeof obj.installed_at === 'string' &&
    isCars(obj.car_id) &&
    isParts(obj.part_id) &&
    isEmployee(obj.installed_by)
  );
}
