import { User } from './user';

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  hire_date: string;
  user_id: User;
}
