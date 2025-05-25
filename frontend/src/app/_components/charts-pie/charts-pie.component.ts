import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-charts-pie',
  standalone: true,
  imports: [
    MatDialogActions,
    MatLabel,
    MatFormFieldModule,
    MatDialogContent,
    MatDialogModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    BaseChartDirective,
  ],
  templateUrl: './charts-pie.component.html',
  styleUrl: './charts-pie.component.scss',
})
export class ChartsPieComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() pieChartData!: ChartData<'pie'>;
  @Input() pieChartOptions!: ChartOptions<'pie'>;
  @Input() hasValue = false;
  
  constructor() {}

  ngOnInit(): void {
    this.chart?.update();
  }
}
