import { Routes } from '@angular/router';
import { LoginComponent } from './_page/Authentication/login/login.component';
import { OtpComponent } from './_page/Authentication/otp/otp.component';
import { ChangePasswordComponent } from './_page/Authentication/change-password/change-password.component';
import { DashboardComponent } from './_page/Dashboard/dashboard/dashboard.component';
import { ProjectsComponent } from './_page/Dashboard/projects/projects.component';
import { TasksComponent } from './_page/Dashboard/tasks/tasks.component';
import { UserComponent as DashboardUserComponent } from './_page/Dashboard/user/user.component';
import { ProjectComponent as DashboardProjectComponent } from './_page/Dashboard/project/project.component';
import { TaskComponent as DashboardTaskComponent } from './_page/Dashboard/task/task.component';
import { TaskComponent as CreateTaskComponent } from './_page/Create/task/task.component';
import { ProjectComponent as CreateProjectComponent } from './_page/Create/project/project.component';
import { UserComponent as CreateUserComponent } from './_page/Create/user/user.component';
import { ProjectMemberComponent } from './_page/Create/project-member/project-member.component';

export const routes: Routes = [
  {
    path: 'authentication',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'forgot-password',
        component: ChangePasswordComponent,
      },
      {
        path: 'otp',
        component: OtpComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    children: [
      { path: 'feed', component: DashboardComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'projects/:suggestion', component: ProjectsComponent },
      { path: 'project/:id', component: DashboardProjectComponent },
      { path: 'tasks', component: TasksComponent },
      { path: 'task/:id', component: DashboardTaskComponent },
      { path: 'user/:id', component: DashboardUserComponent },
    ],
  },
  {
    path: 'create',
    children: [
      { path: 'task', component: CreateTaskComponent },
      { path: 'project', component: CreateProjectComponent },
      { path: 'user', component: CreateUserComponent },
      { path: 'project-member', component: ProjectMemberComponent },
    ],
  },
  // { path: '', redirectTo: 'dashboard/feed', pathMatch: 'full' },
  // { path: '**', redirectTo: 'dashboard/feed' },
];
