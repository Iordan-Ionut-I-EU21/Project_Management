import { Categories } from './category';
import { User } from './user';

export interface Projects {
  id: string;
  name: string;
  categoryId: Categories;
  startDate: Date;
  endDate: Date;
  status: string;
  managerId: User;
  description: string;
}
