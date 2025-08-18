import { EmployeeRole } from '../_enum/employee-role';
import { User } from './user';

export interface Employee {
  id: string | null;
  name: string;
  role: EmployeeRole;
  department: string;
  hire_date: string;
  user_id?: User;
}
