import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule, NgClass } from '@angular/common';
import { Alert } from '../../../_model/_common/alert';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  alert: Alert | null = null;
  private sub!: Subscription;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.sub = this.alertService.alert$.subscribe((alert) => {
      this.alert = alert;
    });
  }

  closeAlert() {
    this.close();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  close() {
    this.alertService.clear();
  }
}
