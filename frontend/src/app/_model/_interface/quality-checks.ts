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

export function isQualityCheck(obj: any): obj is QualityChecks {
  return (
    obj &&
    typeof obj.id === 'string' &&
    typeof obj.check_date === 'string' &&
    typeof obj.passed === 'boolean' &&
    typeof obj.notes === 'string' &&
    obj.car_id !== undefined &&
    obj.inspector_id !== undefined
  );
}
