import { EmployeeRole } from '../_enum/employee-role';
import { isUser, User } from './user';

export interface Employee {
  id: string | null;
  name: string;
  role: EmployeeRole;
  department: string;
  hire_date: string;
  user_id?: User;
}

export function isEmployee(obj: any): obj is Employee {
  return (
    obj &&
    (typeof obj.id === 'string' || obj.id === null) &&
    typeof obj.name === 'string' &&
    typeof obj.department === 'string' &&
    typeof obj.hire_date === 'string' &&
    (obj.user_id === undefined || isUser(obj.user_id))
  );
}
