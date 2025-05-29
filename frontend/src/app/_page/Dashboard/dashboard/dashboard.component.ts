import { Component } from '@angular/core';
import { Card } from '../../../_model/_common/card';
import { TasksService } from '../../../_service/_model/tasks.service';
import { HttpClientModule } from '@angular/common/http';
import { ProjectsMembersService } from '../../../_service/_model/projects-members.service';
import { CardComponent } from '../../../_components/card/card.component';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { NamePage } from '../../../_model/_common/name-page';
import { NamePageComponent } from '../../../_components/name-page/name-page.component';
import { MatCardModule } from '@angular/material/card';
import { JwtService } from '../../../_service/_http/jwt.service';
import { Status } from '../../../_model/_enum/status';
import { RolesLogicallyService } from '../../../_shared/roles-logically.service';
import { SpinnerComponent } from '../../../_service/_spinner/spinner/spinner.component';
import { SpinnerService } from '../../../_service/_spinner/spinner.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HttpClientModule,
    CardComponent,
    CommonModule,
    NamePageComponent,
    MatCardModule,
    SpinnerComponent,
  ],
  providers: [
    JwtService,
    TasksService,
    ProjectsMembersService,
    RolesLogicallyService,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  cards: Card[] = [];

  page: NamePage = {
    name: 'Dashboard Overview',
    icon: 'folder_open',
  };

  showAddPossibility!: boolean;
  constructor(
    private _tasksService: TasksService,
    private _projectsMembersService: ProjectsMembersService,
    private _jwtService: JwtService,
    private _router: Router,
    private _rolesLogically: RolesLogicallyService,
  ) {
    this.showAddPossibility = this._rolesLogically.isAdminPossibility();
    this.onCardsAdmin();
  }

  onCardBoxClicked(card: any) {
    if (!this.showAddPossibility) {
      this._router.navigate(['dashboard', card.route]);
    } else {
      this._router.navigate(['create', card.route]);
    }
  }

  private onCardsAdmin() {
    if (this.showAddPossibility) {
      this.cards = [
        {
          name: 'Create Tasks',
          icon: 'task',
          color: '#facc15',
          route: 'task',
        },
        {
          name: 'Create Projects',
          icon: 'workspaces',
          color: '#38bdf8',
          route: 'project',
        },
        {
          name: 'Create Users',
          icon: 'person',
          color: '#4ade80',
          route: 'user',
        },
        {
          name: 'Create Project Members',
          icon: 'peoples',
          color: '#f87171',
          route: 'project-member',
        },
      ];
    } else if (!this.showAddPossibility) {
      forkJoin({
        taskCount: this._tasksService.getCountOfTasksByUserEmail(
          this._jwtService.getEmail(),
          Status.PENDING
        ),
        projectCount:
          this._projectsMembersService.getCountOfProjectsByUserEmail(
            this._jwtService.getEmail()
          ),
      }).subscribe({
        next: ({ taskCount, projectCount }) => {
          this.cards.push(
            {
              name: 'Number of Tasks',
              count: taskCount,
              icon: 'task',
              color: '#38bdf8',
              route: 'tasks',
            },
            {
              name: 'Number of Projects',
              count: projectCount,
              icon: 'workspaces',
              color: '#facc15',
              route: 'projects',
            }
          );
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {},
      });
    }
  }
}
