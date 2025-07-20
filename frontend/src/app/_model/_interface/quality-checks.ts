import { Cars } from './car';
import { Employee } from './employee';

export interface QualityChecks {
  id: string;
  check_date: string;
  passed: boolean;
  notes: string;
  car_id: Cars;
  inspector_id: Employee;
}
