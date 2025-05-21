import { Progress } from '../_enum/progress';
import { Tasks } from './tasks';

export interface SubTasks {
  id: string;
  taskId: Tasks;
  title: string;
  description: string;
  dueDate: Date;
  progress: Progress;
}
