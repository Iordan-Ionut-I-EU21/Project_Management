import { Component } from '@angular/core';
import { Card } from '../../../_model/_common/card';
import { TasksService } from '../../../_service/_model/tasks.service';
import { JwtService } from '../../../_service/_http/jwt.service';
import { Environment } from '../../../../environments/environment';
import { response } from 'express';
import { HttpClientModule } from '@angular/common/http';
import { ProjectsMembersService } from '../../../_service/_model/projects-members.service';
import { CardComponent } from '../../../_components/card/card.component';
import { CommonModule } from '@angular/common';
import { SpinnerService } from '../../../_service/_spinner/spinner.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { NamePage } from '../../../_model/_common/name-page';
import { NamePageComponent } from '../../../_components/name-page/name-page.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HttpClientModule,
    CardComponent,
    CommonModule,
    NamePageComponent,
    MatCardModule,
  ],
  providers: [JwtService, TasksService, ProjectsMembersService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  cards: Card[] = [];

  page: NamePage = {
    name: 'Dashboard Overview',
    icon: 'folder_open',
  };

  constructor(
    private _tasksService: TasksService,
    private _projectsMembersService: ProjectsMembersService,
    private _jwtService: JwtService,
    private _router: Router
  ) {
    forkJoin({
      taskCount: this._tasksService.getCountOfTasksByUserEmail(
        this._jwtService.getEmail()
      ),
      projectCount: this._projectsMembersService.getCountOfProjectsByUserEmail(
        this._jwtService.getEmail()
      ),
    }).subscribe({
      next: ({ taskCount, projectCount }) => {
        this.cards.push(
          {
            name: 'Number of Tasks',
            count: taskCount,
            icon: 'fa-solid fa-tasks',
            color: '#38bdf8',
            route: 'tasks',
          },
          {
            name: 'Number of Projects',
            count: projectCount,
            icon: 'fa-solid fa-project-diagram',
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

  onCardBoxClicked(card: any) {
    this._router.navigate(['dashboard', card.route]);
  }
}
