import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InformationLeftRight } from './information-left-right';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgClass } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MatButtonToggleChange,
  MatButtonToggleModule,
} from '@angular/material/button-toggle';
import { ICONS } from '../../_shared/icons';
import { DialogService } from '../../_service/_dialog/dialog.service';
import { ViewType } from '../../_dialog/view-type';
import { isMachine, Machines } from '../../_model/_interface/machine';
import { InputComponent } from '../input/input.component';
import { GenInput } from '../input/input';
import { FormGroup } from '@angular/forms';

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
    InputComponent,
  ],
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss',
})
export class InformationComponent {
  @Input() information!: InformationLeftRight;
  @Input() data!: Machines;
  @Input() config!: GenInput;
  @Input() form!: FormGroup;
  @Output() selectChange = new EventEmitter<any>();

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

  onSelectChange(event: any) {
    this.selectChange.emit(event);
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
