import { Cars } from './car';
import { Employee } from './employee';
import { Machines } from './machine';
import { Process } from './process';

export interface ProcessLog {
  id: string;
  start_time: string;
  end_time: string;
  status: string;
  process_id: Process;
  employee_id: Employee;
  car_id: Cars;
  machine_id: Machines;
}

export function isProcessLog(obj: any): obj is ProcessLog {
  return (
    !!obj &&
    typeof obj === 'object' &&
    'machine_id' in obj &&
    obj.machine_id &&
    typeof obj.machine_id.id === 'string'
  );
}
