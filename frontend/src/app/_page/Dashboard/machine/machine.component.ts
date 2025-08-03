import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MachineService } from '../../../_service/_model/machine.service';
import { HttpClientModule } from '@angular/common/http';
import { error } from 'console';
import { MatCardModule } from '@angular/material/card';
import { NamePageComponent } from '../../../_components/name-page/name-page.component';
import { NamePage } from '../../../_components/name-page/name-page';
import { ICONS } from '../../../_shared/icons';
import { Machines } from '../../../_model/_interface/machine';
import { DatePipe, NgClass } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { InformationLeftRight } from '../../../_components/information/informatin-left-right';
import { InformationComponent } from '../../../_components/information/information.component';

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
  ],
  providers: [MachineService, DatePipe],
  templateUrl: './machine.component.html',
  styleUrl: './machine.component.scss',
})
export class MachineComponent {
  key!: string;
  type: boolean = false;
  page!: NamePage;
  machine!: Machines;

  information!: InformationLeftRight;

  constructor(
    private route: ActivatedRoute,
    private _machineService: MachineService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.key = this.route.snapshot.paramMap.get('key')!;
    this.page = {
      name: 'Machine',
      content: [this.key],
      icon: ICONS.MACHINE,
    };
    this._machineService.findMachinesByKey(this.key).subscribe({
      next: (response) => {
        this.machine = response;
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
            {
              name: 'Status',
              icon: ICONS.MACHINE_STATUS,
              answer: this.machine.status,
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
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  ngAfterViewInit(): void {}
}
