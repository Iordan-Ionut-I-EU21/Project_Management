import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MachineService } from '../../../_service/_model/machine.service';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { NamePageComponent } from '../../../_components/name-page/name-page.component';
import { NamePage } from '../../../_components/name-page/name-page';
import { ICONS } from '../../../_shared/icons';
import { Machines } from '../../../_model/_interface/machine';
import { DatePipe, NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { InformationLeftRight } from '../../../_components/information/information-left-right';
import { InformationComponent } from '../../../_components/information/information.component';
import { GenerateTableKeys } from '../../../_components/generate-table/generate-table-key';
import { GenerateTableComponent } from '../../../_components/generate-table/generate-table.component';
import { JwtService } from '../../../_service/_http/jwt.service';
import { AlertService } from '../../../_service/_alert/alert.service';
import { AlertEnum } from '../../../_model/_common/alert';
import { GenInput } from '../../../_components/input/input';
import { MachineStatus } from '../../../_model/_enum/machine-status';
import { FormBuilder, FormGroup } from '@angular/forms';
import { error } from 'console';
import { RolesLogicallyService } from '../../../_shared/roles-logically.service';
import { DialogService } from '../../../_service/_dialog/dialog.service';
import { validateType } from '../../../_dialog/validate-change/validate-type';

@Component({
  selector: 'app-machine',
  standalone: true,
  imports: [
    HttpClientModule,
    MatCardModule,
    NamePageComponent,
    NgClass,
    DatePipe,
    InformationComponent,
    MatIconModule,
    GenerateTableComponent,
  ],
  providers: [MachineService, DatePipe, JwtService],
  templateUrl: './machine.component.html',
  styleUrl: './machine.component.scss',
})
export class MachineComponent {
  key!: string;
  type: boolean = true;
  page!: NamePage;
  machine!: Machines;
  form!: FormGroup;

  information!: InformationLeftRight;
  config!: GenInput;

  keys: GenerateTableKeys[] = [
    GenerateTableKeys.PART_PRODUCTION_BY_MACHINE,
    GenerateTableKeys.MACHINE_PAGE,
  ];
  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private _alertService: AlertService,
    private _jwtService: JwtService,
    private _machineService: MachineService,
    private datePipe: DatePipe,
    private _fb: FormBuilder,
    private _rolesLogicallyService: RolesLogicallyService,
    private _dialogService: DialogService
  ) {
    this.form = this._fb.group({
      status: ['NONE'],
    });

    this._machineService
      .canAccessPage(
        this.route.snapshot.paramMap.get('key')!,
        this._jwtService.getUserInfo()?.name!
      )
      .subscribe({
        next: (response) => {
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
  }

  ngOnInit() {
    this.key = this.route.snapshot.paramMap.get('key')!;
    this.page = {
      name: 'Machine',
      content: [this.key],
      icon: ICONS.MACHINE,
    };
    this.onDataPage();
  }

  onSelectChange($event: any) {
    this._dialogService
      .openDialogValidateChange(
        this.key,
        validateType.MACHINE,
        this.form.value.status,
        this.machine.status
      )
      .subscribe((result) => {
        this.onDataPage();
      });
  }

  onType(event: boolean) {
    this.type = event;
  }

  private onDataPage() {
    this._machineService.findMachinesByNameOrId(this.key).subscribe({
      next: (response) => {
        this.machine = response;
        this.form.get('status')?.setValue(response.status);
        this.information = {
          left: [
            {
              name: 'Name',
              icon: ICONS.MACHINE,
              answer: this.machine.name,
            },
            {
              name: 'Type',
              icon: ICONS.MACHINE_TYPE,
              answer: this.machine.type,
            },
          ],
          right: [
            {
              name: 'Last Maintenance',
              icon: ICONS.MACHINE_LAST,
              answer: this.datePipe.transform(
                this.machine.last_maintenance,
                'dd/MM/yyyy HH:mm'
              )!,
            },
          ],
        };
        if (!this._rolesLogicallyService.onIsAdmin()) {
          this.information.left.push({
            name: 'Status',
            icon: ICONS.MACHINE_STATUS,
            answer: this.machine.status,
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
  }
}
