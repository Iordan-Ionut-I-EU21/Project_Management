import { Routes } from '@angular/router';
import { LoginComponent } from './_page/Authentication/login/login.component';
import { OtpComponent } from './_page/Authentication/otp/otp.component';
import { ChangePasswordComponent } from './_page/Authentication/change-password/change-password.component';
import { DashboardComponent } from './_page/Dashboard/dashboard/dashboard.component';
import { ProjectsComponent } from './_page/Dashboard/projects/projects.component';
import { TeamComponent } from './_page/Dashboard/team/team.component';
import { ReportsComponent } from './_page/Dashboard/reports/reports.component';
import { TasksComponent } from './_page/Dashboard/tasks/tasks.component';
import { UserComponent } from './_page/Dashboard/user/user.component';
import { TaskComponent } from './_page/Dashboard/task/task.component';
import { ProjectComponent } from './_page/Dashboard/project/project.component';

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
      { path: 'team', component: TeamComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'project/:id', component: ProjectComponent },
      { path: 'tasks', component: TasksComponent },
      { path: 'task/:id', component: TaskComponent },
      { path: 'user/:id', component: UserComponent },
    ],
  },
  { path: '', redirectTo: 'dashboard/feed', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard/feed' },
];
