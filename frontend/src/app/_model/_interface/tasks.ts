import { Priority } from '../_enum/priority';
import { Status } from '../_enum/status';
import { Category } from './category';
import { Projects } from './projects';
import { User } from './user';

export interface Tasks {
  id: string;
  projectId: Projects;
  assignedId: User;
  title: string;
  description: string;
  dueDate: Date;
  status: Status;
  priority: Priority;
  createdAt: Date;
}
