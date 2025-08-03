import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
} from '@angular/core';
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
  selector: 'app-charts',
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
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
})
export class ChartsComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() chartData!: ChartData;
  @Input() chartOptions!: ChartOptions;
  @Input() hasValue = false;
  @Input() type!: 'pie' | 'line' | 'polarArea';

  constructor() {}

  ngOnInit(): void {
    this.chart?.update();
  }
}
