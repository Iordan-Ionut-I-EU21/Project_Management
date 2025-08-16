import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContainer,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { VALIDATE_STATUS } from './validate-status';
import { validateType } from './validate-type';
import { MachineService } from '../../_service/_model/machine.service';
import { HttpClientModule } from '@angular/common/http';
import { AlertService } from '../../_service/_alert/alert.service';
import { AlertEnum } from '../../_model/_common/alert';
import { MachineStatus } from '../../_model/_enum/machine-status';
import { ProcessLogService } from '../../_service/_model/process-log.service';
import { ProcessLogStatus } from '../../_model/_enum/process-log-status';
import { CarsService } from '../../_service/_model/cars.service';
import { CarsStatus } from '../../_model/_enum/cars-status';

@Component({
  selector: 'app-validate-change',
  standalone: true,
  imports: [
    HttpClientModule,
    MatDialogContainer,
    MatDialogContent,
    MatIconModule,
  ],
  providers: [MachineService, CarsService, ProcessLogService, AlertService],
  templateUrl: './validate-change.component.html',
  styleUrl: './validate-change.component.scss',
})
export class ValidateChangeComponent {
  message!: string;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      key: string;
      type: validateType;
      newStatus: VALIDATE_STATUS;
      oldStatus: VALIDATE_STATUS;
    },
    private _alertService: AlertService,
    private dialogRef: MatDialogRef<ValidateChangeComponent>,
    private _machineService: MachineService,
    private _processLogService: ProcessLogService,
    private _carsService: CarsService
  ) {
    console.log(this.data);
  }

  ngOnInit(): void {
    switch (this.data.type) {
      case validateType.PROCESS_LOG: {
        this.message =
          'You are sure if want to change status from ' +
          this.data.oldStatus +
          ' to ' +
          this.data.newStatus +
          '?';
        break;
      }
      case validateType.MACHINE: {
        this.message =
          'You are sure if want to change status from ' +
          this.data.oldStatus +
          ' to ' +
          this.data.newStatus +
          '?';
        break;
      }
      case validateType.CAR: {
        this.message =
          'You are sure if want to change status from ' +
          this.data.oldStatus +
          ' to ' +
          this.data.newStatus +
          '?';
        break;
      }
      default: {
        console.log('default');
      }
    }
  }

  onSave() {
    switch (this.data.type) {
      case validateType.PROCESS_LOG: {
        this._processLogService
          .updateProcessLogStatus(
            this.data.key,
            this.data.newStatus as ProcessLogStatus
          )
          .subscribe({
            next: (response) => {
              this.onAlert(response);
            },
            error: (error) => {
              console.error(error);
            },
          });
        break;
      }
      case validateType.MACHINE: {
        this._machineService
          .updateMachineStatus(
            this.data.key,
            this.data.newStatus as MachineStatus
          )
          .subscribe({
            next: (response) => {
              this.onAlert(response);
            },
            error: (error) => {
              console.error(error);
            },
          });
        break;
      }
      case validateType.CAR: {
        this._carsService
          .updateCarsStatus(this.data.key, this.data.newStatus as CarsStatus)
          .subscribe({
            next: (response) => {
              this.onAlert(response);
            },
            error: (error) => {
              console.error(error);
            },
          });
        break;
      }
      default: {
        console.log('default');
      }
    }
  }

  onClose(result: boolean) {
    this.dialogRef.close(result);
  }

  private onAlert(response: number) {
    if (response === 0) {
      this._alertService.show(
        'Something is wrong, please contact the admin.',
        AlertEnum.ERROR
      );
    } else {
      this._alertService.show('The change status was make.', AlertEnum.SUCCESS);
    }
    this.onClose(true);
  }
}
