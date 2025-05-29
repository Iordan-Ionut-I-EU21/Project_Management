import { Role } from '../_enum/role';
import { Projects } from './projects';
import { User } from './user';

export interface ProjectMembers {
  id: string;
  projectId: Projects;
  userId: User;
  role: Role;
}
