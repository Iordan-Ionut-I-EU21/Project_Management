import { Component, Inject } from '@angular/core';
import { MachineService } from '../../_service/_model/machine.service';
import { ChartData, ChartOptions } from 'chart.js';
import { MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';
import { isProcessLog, ProcessLog } from '../../_model/_interface/process-log';
import { Cars } from '../../_model/_interface/car';
import { ChartsComponent } from '../../_components/charts/charts.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-line',
  standalone: true,
  imports: [ChartsComponent, HttpClientModule, MatDialogContent, CommonModule],
  providers: [MachineService],
  templateUrl: './view-line.component.html',
  styleUrl: './view-line.component.scss',
})
export class ViewLineComponent {
  hasValue = false;

  lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        borderColor: '#42A5F5',
        backgroundColor: 'rgba(66,165,245,0.3)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  constructor(
    private _machineService: MachineService,
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

            this.lineChartData.labels = data.map((d) => d.status);
            this.lineChartData.datasets[0].data = data.map((d) => d.count);
          },
          error: (error) => {
            console.error('Line chart data error:', error);
          },
        });
    }
  }
}
