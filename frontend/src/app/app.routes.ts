import { Routes } from '@angular/router';
import { DashboardComponent } from './_components/dashboard/dashboard.component';
import { ProjectsComponent } from './_components/projects/projects.component';
import { TeamComponent } from './_components/team/team.component';
import { ReportsComponent } from './_components/reports/reports.component';
import { SettingsComponent } from './_components/settings/settings.component';
import { LogoutComponent } from './_components/logout/logout.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'team', component: TeamComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
