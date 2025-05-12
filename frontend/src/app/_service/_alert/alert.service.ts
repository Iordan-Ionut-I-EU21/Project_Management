import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Alert, AlertEnum } from '../../_model/_common/alert';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertSubject = new BehaviorSubject<Alert | null>(null);
  alert$ = this.alertSubject.asObservable();

  show(message: string, type: Alert['type'] = AlertEnum.SUCCESS) {
    this.alertSubject.next({ message, type });
    setTimeout(() => this.clear(), 9000);
  }

  clear() {
    this.alertSubject.next(null);
  }
}
