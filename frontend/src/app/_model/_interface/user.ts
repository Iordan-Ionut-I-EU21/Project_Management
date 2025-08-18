import { UserRole } from '../_enum/user-role';
import { Employee } from './employee';

export interface User {
  id: string | null;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  employees_id: Employee;
}
export function isUser(obj: any): obj is User {
  return (
    !!obj && typeof obj === 'object' && 'email' in obj && 'username' in obj
  );
}
