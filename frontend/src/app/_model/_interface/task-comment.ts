import { Tasks } from './tasks';
import { User } from './user';

export interface TasksComments {
  id: string;
  taskId: Tasks;
  userId: User;
  commnet: string;
  createdAt: Date;
}
