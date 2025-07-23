import { Routes } from '@angular/router';
import { LoginComponent } from './_page/Authentication/login/login.component';
import { OtpComponent } from './_page/Authentication/otp/otp.component';
import { ChangePasswordComponent } from './_page/Authentication/change-password/change-password.component';
import { DashboardComponent } from './_page/Dashboard/dashboard/dashboard.component';
import { EmployeeComponent } from './_page/Dashboard/employee/employee.component';

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
      { path: 'employee', component: EmployeeComponent },
    ],
  },
];
