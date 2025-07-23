import { Cars } from './car';
import { Employee } from './employee';
import { Parts } from './parts';

export interface CarsParts {
  id: string;
  quantity: number;
  installed_at: string;
  car_id: Cars;
  part_id: Parts;
  installed_by: Employee;
}
