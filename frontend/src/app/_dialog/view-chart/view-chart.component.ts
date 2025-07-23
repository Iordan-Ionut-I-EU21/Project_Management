import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
} from '@angular/material/dialog';
import { ChartData, ChartOptions } from 'chart.js';
import { JwtService } from '../../_service/_http/jwt.service';
import { isProcessLog, ProcessLog } from '../../_model/_interface/process-log';
import { MachineService } from '../../_service/_model/machine.service';
import { ChartsComponent } from '../../_components/charts/charts.component';
import { Cars, isCars } from '../../_model/_interface/car';
import { CarsService } from '../../_service/_model/cars.service';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-view-chart',
  standalone: true,
  imports: [ChartsComponent, HttpClientModule, MatDialogContent, CommonModule],
  providers: [JwtService, MachineService, CarsService],
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
    private _machineService: MachineService,
    private _carsService: CarsService,
    @Inject(MAT_DIALOG_DATA)
    protected data: {
      data: ProcessLog | Cars;
      type: 'PROCESS_LOG' | 'CARS';
      title: string;
    }
  ) {}

  ngAfterViewInit(): void {
    if (isProcessLog(this.data.data)) {
      this._machineService
        .countStatusByMachineId(this.data.data.machine_id.id)
        .subscribe({
          next: (response) => {
            Object.entries(response).forEach(([key, value]) => {
              if (value !== 0) {
                this.hasValue = true;
              }
            });
            const data = Object.values(response);

            this.pieChartData.labels = data.map(
              (l) => l.status + ' ' + l.count
            );
            this.pieChartData.datasets[0].data = data.map(
              (d) => d.count
            ) as number[];
            this.pieChartData.datasets[0].backgroundColor = [
              'rgba(255, 206, 86, 0.7)', // PENDING
              'rgba(54, 162, 235, 0.7)', // IN_PROGRESS
              'rgba(75, 192, 192, 0.7)', // COMPLETED
              'rgba(255, 99, 132, 0.7)', // FAILED
              'rgba(255, 159, 64, 0.7)', // PAUSED
              'rgba(153, 102, 255, 0.7)', // CANCELLED
            ];

            this.pieChartData.datasets[0].borderColor = [
              'rgba(255, 206, 86, 1)', // PENDING
              'rgba(54, 162, 235, 1)', // IN_PROGRESS
              'rgba(75, 192, 192, 1)', // COMPLETED
              'rgba(255, 99, 132, 1)', // FAILED
              'rgba(255, 159, 64, 1)', // PAUSED
              'rgba(153, 102, 255, 1)', // CANCELLED
            ];
          },
          error: (error) => {
            console.error(error);
          },
        });
    } else if (isCars(this.data.data)) {
      this._carsService
        .countStatusByCarModelId(this.data.data.model_id.id)
        .subscribe({
          next: (response) => {
            Object.entries(response).forEach(([key, value]) => {
              if (value !== 0) {
                this.hasValue = true;
              }
            });
            const data = Object.values(response);

            this.pieChartData.labels = data.map(
              (l) => l.status + ' ' + l.count
            );
            this.pieChartData.datasets[0].data = data.map(
              (d) => d.count
            ) as number[];
            this.pieChartData.datasets[0].backgroundColor = [
              'rgba(255, 206, 86, 0.7)', // IN_PRODUCTION
              'rgba(54, 162, 235, 0.7)', // ASSEMBLED
              'rgba(75, 192, 192, 0.7)', // SHIPPED
              'rgba(255, 99, 132, 0.7)', // QC_FAILED
            ];

            this.pieChartData.datasets[0].borderColor = [
              'rgba(255, 206, 86, 1)', // IN_PRODUCTION
              'rgba(54, 162, 235, 1)', // ASSEMBLED
              'rgba(75, 192, 192, 1)', // SHIPPED
              'rgba(255, 99, 132, 1)', // QC_FAILED
            ];
          },
          error: (error) => {
            console.error(error);
          },
        });
    }
  }
}
