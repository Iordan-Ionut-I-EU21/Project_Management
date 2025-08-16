import { UserRole } from '../_enum/user-role';
import { Employee } from './employee';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  employees_id: Employee;
}
