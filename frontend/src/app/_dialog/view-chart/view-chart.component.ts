import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { JwtService } from '../../_service/_http/jwt.service';
import { TasksService } from '../../_service/_model/tasks.service';
import { Environment } from '../../../environments/environment';
import { ChartsPieComponent } from '../../_components/charts-pie/charts-pie.component';
import { ProjectsService } from '../../_service/_model/projects.service';

@Component({
  selector: 'app-view-chart',
  standalone: true,
  imports: [ChartsPieComponent, MatDialogContent, CommonModule],
  providers: [TasksService, JwtService],
  templateUrl: './view-chart.component.html',
  styleUrl: './view-chart.component.scss',
})
export class ViewChartComponent {
  hasValue = false;

  pieChartData: ChartData<'pie'> = {
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
  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { position: 'right' },
      tooltip: { enabled: true },
    },
  };

  constructor(
    private _taskService: TasksService,
    private _projectService: ProjectsService,
    @Inject(MAT_DIALOG_DATA)
    protected data: { projectId: string; type: 'PROJECT' }
  ) {}

  ngAfterViewInit(): void {
    switch (this.data.type) {
      case 'PROJECT': {
        this._projectService.getStatusCounts(this.data.projectId).subscribe({
          next: (response) => {
            Object.entries(response).forEach(([key, value]) => {
              if (value !== 0) {
                this.hasValue = true;
              }
            });

            const labels = Object.keys(response);
            const data = Object.values(response);

            this.pieChartData.labels = labels;
            this.pieChartData.datasets[0].data = data as number[];
            this.pieChartData.datasets[0].backgroundColor = [
              'rgba(54, 162, 235, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(255, 206, 86, 0.7)',
            ];
            this.pieChartData.datasets[0].borderColor = [
              'rgba(54, 162, 235, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(255, 206, 86, 1)',
            ];
          },
          error: (error) => {
            console.log(error);
          },
        });
        break;
      }
    }
  }
}
