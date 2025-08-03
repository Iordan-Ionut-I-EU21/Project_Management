import { Component, Input } from '@angular/core';
import { InformationLeftRight } from './informatin-left-right';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgClass } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MatButtonToggleChange,
  MatButtonToggleModule,
} from '@angular/material/button-toggle';
import { ICONS } from '../../_shared/icons';
import { error } from 'console';
import { DialogService } from '../../_service/_dialog/dialog.service';
import { machine } from 'os';
import { ViewType } from '../../_dialog/view-type';
import { isMachine, Machines } from '../../_model/_interface/machine';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    NgClass,
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
  ],
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss',
})
export class InformationComponent {
  @Input() information!: InformationLeftRight;
  @Input() data!: Machines;

  type!: ViewType;
  title!: string;
  chars: Char[] = [
    {
      name: 'Pie',
      icon: ICONS.PIE,
    },
    {
      name: 'Line',
      icon: ICONS.LINE,
    },
    { name: 'Polar', icon: ICONS.POLAR },
  ];

  constructor(private _dialogService: DialogService) {
    if (isMachine(this.data)) {
      this.type = ViewType.MACHINES;
      this.title = 'Status by Machine';
    }
  }

  onSelectChart(event: MatButtonToggleChange) {
    switch (event.value) {
      case this.chars[0].name: {
        this._dialogService.openDialogViewChart(
          this.data,
          this.type,
          this.title
        );
        break;
      }
      case this.chars[1].name: {
        this._dialogService.openDialogViewLine(
          this.data,
          this.type,
          this.title
        );
        break;
      }
      case this.chars[2].name: {
        this._dialogService.openDialogViewPolar(
          this.data,
          this.type,
          this.title
        );
        break;
      }
      default: {
        console.log('NOT FIND ANY CHART');
      }
    }
  }
}
interface Char {
  name: string;
  icon: string;
}
