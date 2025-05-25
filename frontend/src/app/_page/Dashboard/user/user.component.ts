import { Component } from '@angular/core';
import { UserService } from '../../../_service/_model/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../_model/_interface/user';
import { MatCardModule } from '@angular/material/card';
import { TasksService } from '../../../_service/_model/tasks.service';
import { ChartData, ChartOptions } from 'chart.js';
import { Status } from '../../../_model/_enum/status';
import { ChartsPieComponent } from '../../../_components/charts-pie/charts-pie.component';
import { ProjectsMembersService } from '../../../_service/_model/projects-members.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatCardModule, ChartsPieComponent],
  providers: [UserService, TasksService, ProjectsMembersService],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  id!: string;
  user!: User;
  hasValue = false;
  hasValueROLE = false;
  pieChartDataLOW: ChartData<'pie'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  };
  pieChartOptionsLOW: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { position: 'right' },
      tooltip: { enabled: true },
      title: {
        display: true,
        text: 'Priority LOW',
      },
    },
  };
  pieChartDataMEDIUM: ChartData<'pie'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  };
  pieChartOptionsMEDIUM: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { position: 'right' },
      tooltip: { enabled: true },
      title: {
        display: true,
        text: 'Priority MEDIUM',
      },
    },
  };
  pieChartDataHIGH: ChartData<'pie'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  };
  pieChartOptionsHIGH: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { position: 'right' },
      tooltip: { enabled: true },
      title: {
        display: true,
        text: 'Priority HIGH',
      },
    },
  };

  pieChartDataROLE: ChartData<'pie'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  };
  pieChartOptionsROLE: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { position: 'right' },
      tooltip: { enabled: true },
      title: {
        display: true,
        text: 'ROLE Projects',
      },
    },
  };

  constructor(
    private _userService: UserService,
    private _tasksService: TasksService,
    private _projectsMembersService: ProjectsMembersService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this._userService.getUserById(this.id).subscribe({
      next: (response) => {
        this.user = response;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this._tasksService.countByUserIdAndStatusAndPriority(this.id).subscribe({
      next: (response) => {
        Object.entries(response).forEach(([key, value]) => {
          const statusCounts = value as Record<Status, number>;
          if (
            statusCounts.COMPLETED !== 0 ||
            statusCounts.ONGOING !== 0 ||
            statusCounts.PENDING !== 0
          ) {
            this.hasValue = true;
          }
        });

        let labels = Object.keys(response.LOW);
        let data = Object.values(response.LOW);

        this.pieChartDataLOW.labels = labels;
        this.pieChartDataLOW.datasets[0].data = data as number[];
        this.pieChartDataLOW.datasets[0].backgroundColor = [
          'rgba(54, 162, 235, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 206, 86, 0.7)',
        ];
        this.pieChartDataLOW.datasets[0].borderColor = [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
        ];

        labels = Object.keys(response.MEDIUM);
        data = Object.values(response.MEDIUM);

        this.pieChartDataMEDIUM.labels = labels;
        this.pieChartDataMEDIUM.datasets[0].data = data as number[];
        this.pieChartDataMEDIUM.datasets[0].backgroundColor = [
          'rgba(54, 162, 235, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 206, 86, 0.7)',
        ];
        this.pieChartDataMEDIUM.datasets[0].borderColor = [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
        ];

        labels = Object.keys(response.HIGH);
        data = Object.values(response.HIGH);

        this.pieChartDataHIGH.labels = labels;
        this.pieChartDataHIGH.datasets[0].data = data as number[];
        this.pieChartDataHIGH.datasets[0].backgroundColor = [
          'rgba(54, 162, 235, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 206, 86, 0.7)',
        ];
        this.pieChartDataHIGH.datasets[0].borderColor = [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
        ];
      },
      error: (error) => {
        console.log(error);
      },
    });

    this._projectsMembersService.getCountByRole(this.id).subscribe({
      next: (response) => {
        Object.entries(response).forEach(([key, value]) => {
          if (value !== 0) {
            this.hasValueROLE = true;
          }
        });

        const labels = Object.keys(response);
        const data = Object.values(response);

        this.pieChartDataROLE.labels = labels;
        this.pieChartDataROLE.datasets[0].data = data as number[];
        this.pieChartDataROLE.datasets[0].backgroundColor = [
          'rgba(54, 162, 235, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 206, 86, 0.7)',
        ];
        this.pieChartDataROLE.datasets[0].borderColor = [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
        ];
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onGetFirstLetter() {
    return this.user?.name.charAt(0).toUpperCase();
  }
}
