import { Component } from '@angular/core';
import {
  isProcessLog,
  ProcessLog,
} from '../../../_model/_interface/process-log';
import { NamePage } from '../../../_components/name-page/name-page';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InformationLeftRight } from '../../../_components/information/information-left-right';
import { GenInput } from '../../../_components/input/input';
import { GenerateTableKeys } from '../../../_components/generate-table/generate-table-key';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../_service/_alert/alert.service';
import { JwtService } from '../../../_service/_http/jwt.service';
import { ProcessLogService } from '../../../_service/_model/process-log.service';
import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { RolesLogicallyService } from '../../../_shared/roles-logically.service';
import { DialogService } from '../../../_service/_dialog/dialog.service';
import { ICONS } from '../../../_shared/icons';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { NamePageComponent } from '../../../_components/name-page/name-page.component';
import { MatIconModule } from '@angular/material/icon';
import { GenerateTableComponent } from '../../../_components/generate-table/generate-table.component';
import { isMachine, Machines } from '../../../_model/_interface/machine';
import { Segment } from './segment';
import { AlertEnum } from '../../../_model/_common/alert';
import { validateType } from '../../../_dialog/validate-change/validate-type';
import { MachineService } from '../../../_service/_model/machine.service';
import { MachineStatus } from '../../../_model/_enum/machine-status';
import { InformationComponent as ComInformationComponent } from '../../../_components/information/information.component';
import { ProcessLogStatus } from '../../../_model/_enum/process-log-status';
import { CarsService } from '../../../_service/_model/cars.service';
import { Cars, isCars } from '../../../_model/_interface/car';
import { CarsStatus } from '../../../_model/_enum/cars-status';
import { UserService } from '../../../_service/_model/user.service';
import { User } from '../../../_model/_interface/user';
import { ViewData } from '../../../_dialog/view-data';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [
    HttpClientModule,
    MatCardModule,
    NamePageComponent,
    NgClass,
    DatePipe,
    ComInformationComponent,
    CommonModule,
    MatIconModule,
    GenerateTableComponent,
  ],
  providers: [
    ProcessLogService,
    CarsService,
    MachineService,
    DatePipe,
    JwtService,
    UserService,
  ],
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss',
})
export class InformationComponent {
  key!: string;
  type: boolean = true;
  page!: NamePage;
  data!: ViewData;
  form!: FormGroup;
  segment!: Segment;

  information!: InformationLeftRight;
  config!: GenInput;

  keys!: GenerateTableKeys[];

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private _alertService: AlertService,
    private _jwtService: JwtService,
    private _processLogService: ProcessLogService,
    private _machineService: MachineService,
    private _carsService: CarsService,
    private _userService: UserService,
    private datePipe: DatePipe,
    private _fb: FormBuilder,
    private _rolesLogicallyService: RolesLogicallyService,
    private _dialogService: DialogService
  ) {
    const segments = this._router.url.split('/');
    const processSegment = segments[2];
    const foundEntry = Object.entries(Segment).find(
      ([key, value]) => value === processSegment
    );

    if (foundEntry) {
      this.segment = foundEntry[1] as Segment;
    } else {
      this._alertService.show('Page not fount', AlertEnum.ERROR);
    }

    this.form = this._fb.group({
      status: ['NONE'],
    });

    if (this._rolesLogicallyService.onIsWorker()) {
      switch (this.segment) {
        case Segment.PROCESS: {
          this._processLogService
            .canAccessPage(
              this.route.snapshot.paramMap.get('key')!,
              this._jwtService.getUserInfo()?.name!
            )
            .subscribe({
              next: (response: Boolean) => {
                if (response) {
                  this._alertService.show(
                    "Don't have access on this information.",
                    AlertEnum.ERROR
                  );
                  this._router.navigateByUrl('dashboard/feed');
                }
              },
              error: (error) => {
                console.error(error);
              },
            });
          break;
        }
        case Segment.MACHINE: {
          this._machineService
            .canAccessPage(
              this.route.snapshot.paramMap.get('key')!,
              this._jwtService.getUserInfo()?.name!
            )
            .subscribe({
              next: (response: Boolean) => {
                if (response) {
                  this._alertService.show(
                    "Don't have access on this information.",
                    AlertEnum.ERROR
                  );
                  this._router.navigateByUrl('dashboard/feed');
                }
              },
              error: (error) => {
                console.error(error);
              },
            });
          break;
        }
        case Segment.CAR: {
          this._carsService
            .canAccessPage(
              this.route.snapshot.paramMap.get('key')!,
              this._jwtService.getUserInfo()?.name!
            )
            .subscribe({
              next: (response: Boolean) => {
                if (response) {
                  this._alertService.show(
                    "Don't have access on this information.",
                    AlertEnum.ERROR
                  );
                  this._router.navigateByUrl('dashboard/feed');
                }
              },
              error: (error) => {
                console.error(error);
              },
            });
          break;
        }
        case Segment.USER: {
          this._userService
            .canAccessPage(this.route.snapshot.paramMap.get('key')!)
            .subscribe({
              next: (response: Boolean) => {
                if (response) {
                  this._alertService.show(
                    "Don't have access on this information.",
                    AlertEnum.ERROR
                  );
                  this._router.navigateByUrl('dashboard/feed');
                }
              },
              error: (error) => {
                console.error(error);
              },
            });
          break;
        }
      }
    }
  }

  ngOnInit(): void {
    this.key = this.route.snapshot.paramMap.get('key')!;
    switch (this.segment) {
      case Segment.PROCESS: {
        this.page = {
          name: 'Process',
          content: [this.key],
          icon: ICONS.PROCESS,
        };
        break;
      }
      case Segment.MACHINE: {
        this.page = {
          name: 'Machine',
          content: [this.key],
          icon: ICONS.MACHINE,
        };
        this.keys = [
          GenerateTableKeys.PART_PRODUCTION_BY_MACHINE,
          GenerateTableKeys.MACHINE_PAGE,
        ];
        break;
      }
      case Segment.CAR: {
        this.page = {
          name: 'Car',
          content: [this.key],
          icon: ICONS.CAR,
        };
        break;
      }
      case Segment.USER: {
        this.page = {
          name: 'User',
          content: [this.key],
          icon: ICONS.EMPLOYEE,
        };
        break;
      }
      default: {
        console.error('not find ');
      }
    }
    this.onDataPage();
  }

  onSelectChange($event: any) {
    if (isProcessLog(this.data)) {
      this._dialogService
        .openDialogValidateChange(
          this.key,
          validateType.PROCESS_LOG,
          this.form.value.status,
          this.data.status as ProcessLogStatus
        )
        .subscribe((result) => {
          this.onDataPage();
        });
    } else if (isMachine(this.data)) {
      this._dialogService
        .openDialogValidateChange(
          this.key,
          validateType.MACHINE,
          this.form.value.status,
          this.data.status
        )
        .subscribe((result) => {
          this.onDataPage();
        });
    } else if (isCars(this.data)) {
      this._dialogService
        .openDialogValidateChange(
          this.key,
          validateType.CAR,
          this.form.value.status,
          this.data.status
        )
        .subscribe((result) => {
          this.onDataPage();
        });
    }
  }

  onType(event: boolean) {
    this.type = event;
  }

  private onDataPage() {
    switch (this.segment) {
      case Segment.PROCESS: {
        this._processLogService.findProcessByNameOrId(this.key).subscribe({
          next: (response) => {
            this.data = response;
            this.form.get('status')?.setValue(response.status);
            this.information = {
              left: [
                {
                  name: 'Process Name',
                  icon: ICONS.PROCESS,
                  answer: response.process_id.name,
                },
                {
                  name: 'Process Description',
                  icon: ICONS.DESCRIPTION,
                  answer: response.process_id.description,
                },
                {
                  name: 'Car VIN',
                  icon: ICONS.CAR_VIN,
                  answer: response.car_id.vin,
                },
                {
                  name: 'Car Model',
                  icon: ICONS.CAR,
                  answer: response.car_id.model_id.name,
                },
                {
                  name: 'Machine name',
                  icon: ICONS.MACHINE,
                  answer: response.machine_id.name,
                },
              ],
              right: [
                {
                  name: 'Start',
                  icon: ICONS.MACHINE_LAST,
                  answer: this.datePipe.transform(
                    response.start_time,
                    'dd/MM/yyyy HH:mm'
                  )!,
                },
                {
                  name: 'End',
                  icon: ICONS.MACHINE_LAST,
                  answer: this.datePipe.transform(
                    response.end_time,
                    'dd/MM/yyyy HH:mm'
                  )!,
                },
              ],
            };
            if (
              this._jwtService.getUserInfo()?.name !==
                response.employee_id.user_id.name ||
              !this._rolesLogicallyService.onIsAdminOrManager()
            ) {
              this.config = {
                placeholder: 'Status',
                formControlName: 'status',
                type: 'text',
              };
            } else {
              this.config = {
                placeholder: 'Status',
                formControlName: 'status',
                type: 'select',
                options: ['NONE', ...Object.values(ProcessLogStatus)],
              };
            }
          },
          error: (error) => {
            console.error(error);
          },
        });
        break;
      }
      case Segment.MACHINE: {
        this._machineService.findMachinesByNameOrId(this.key).subscribe({
          next: (response) => {
            this.data = response;
            this.form.get('status')?.setValue(response.status);
            this.information = {
              left: [
                {
                  name: 'Name',
                  icon: ICONS.MACHINE,
                  answer: response.name,
                },
                {
                  name: 'Type',
                  icon: ICONS.MACHINE_TYPE,
                  answer: response.type,
                },
              ],
              right: [
                {
                  name: 'Last Maintenance',
                  icon: ICONS.MACHINE_LAST,
                  answer: this.datePipe.transform(
                    response.last_maintenance,
                    'dd/MM/yyyy HH:mm'
                  )!,
                },
              ],
            };
            if (!this._rolesLogicallyService.onIsAdminOrManager()) {
              this.information.left.push({
                name: 'Status',
                icon: ICONS.MACHINE_STATUS,
                answer: response.status,
              });
            } else {
              this.config = {
                placeholder: 'Status',
                formControlName: 'status',
                type: 'select',
                options: ['NONE', ...Object.values(MachineStatus)],
              };
            }
          },
          error: (error) => {
            console.error(error);
          },
        });
        break;
      }
      case Segment.CAR: {
        this._carsService.findCarsByVinOrId(this.key).subscribe({
          next: (response) => {
            this.data = response;
            this.form.get('status')?.setValue(response.status);
            this.information = {
              left: [
                {
                  name: 'Car Model',
                  icon: ICONS.CAR,
                  answer: response.model_id.name,
                },
                {
                  name: 'Generation',
                  icon: ICONS.CAR_GENERATION,
                  answer: response.model_id.generation + '',
                },
                {
                  name: 'Release Year',
                  icon: ICONS.CAR,
                  answer: response.model_id.release_year + '',
                },
              ],
              right: [
                {
                  name: 'Assembly Date',
                  icon: ICONS.MACHINE_LAST,
                  answer: response.assembly_date,
                },
              ],
            };

            this.config = {
              placeholder: 'Status',
              formControlName: 'status',
              type: 'select',
              options: ['NONE', ...Object.values(CarsStatus)],
            };
          },
          error: (error) => {
            console.error(error);
          },
        });
        break;
      }
      case Segment.USER: {
        this._userService.findUserByUsernameOrId(this.key).subscribe({
          next: (response) => {
            this.data = response;
            this.information = {
              left: [
                {
                  name: 'Email',
                  icon: ICONS.EMAIL,
                  answer: response.email,
                },
                {
                  name: 'Role',
                  icon: ICONS.ROLE,
                  answer: response.role,
                },
                {
                  name: 'Department',
                  icon: ICONS.DEPARTMENT,
                  answer: response.employees_id.department,
                },
              ],
              right: [
                {
                  name: 'Hired Date',
                  icon: ICONS.MACHINE_LAST,
                  answer: this.datePipe.transform(
                    response.employees_id.hire_date,
                    'dd/MM/yyyy HH:mm'
                  )!,
                },
              ],
            };
          },
          error: (error) => {
            console.error(error);
          },
        });
        break;
      }
      default: {
        console.error('not find ');
      }
    }
  }
}
