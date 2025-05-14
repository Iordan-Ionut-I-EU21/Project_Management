import { Category } from './category';
import { User } from './user';

export interface Projects {
  id: string;
  name: string;
  categoryId: Category;
  startDate: string;
  endDate: string;
  status: string;
  managerId: User;
  description: string;
}
