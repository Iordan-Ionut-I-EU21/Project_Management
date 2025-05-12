import { Component } from '@angular/core';
import { SpinnerService } from '../spinner.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent {
  loading$: any;

  constructor(private spinner: SpinnerService) {
    this.loading$ = this.spinner.loading$;
  }
}
