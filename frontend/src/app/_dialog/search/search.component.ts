import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { ICONS } from '../../_shared/icons';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../../_service/_model/user.service';
import { debounceTime } from 'rxjs';
import { error } from 'console';
import { isUser, User } from '../../_model/_interface/user';
import { CarsModelService } from '../../_service/_model/car-model.service';
import { CarModel, isCarModel } from '../../_model/_interface/car-model';
import { MachineService } from '../../_service/_model/machine.service';
import { isMachine, Machines } from '../../_model/_interface/machine';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    HttpClientModule,
    MatDialogContent,
    CommonModule,
    MatButtonToggleModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
  ],
  providers: [UserService, CarsModelService, MachineService],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  searchOptions: Search[] = [
    {
      name: 'User',
      type: 'user',
      icon: ICONS.EMPLOYEE,
    },
    // {
    //   name: 'Process Log',
    //   type: 'process-log',
    //   icon: ICONS.PROCESS,
    // },
    {
      name: 'Cars',
      type: 'car',
      icon: ICONS.CAR,
    },
    {
      name: 'Machines',
      type: 'machine',
      icon: ICONS.MACHINE,
    },
  ];

  ICONS: typeof ICONS = ICONS;
  searchSelect!: Search;
  options!: TYPES[];
  form!: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private dialogRef: MatDialogRef<SearchComponent>,
    private _userService: UserService,
    private _carModelService: CarsModelService,
    private _machineService: MachineService
  ) {
    this.searchSelect = this.searchOptions[0];
    this.form = this._fb.group({
      search: [''],
    });
  }

  ngOnInit() {
    this.form
      .get('search')!
      .valueChanges.pipe(debounceTime(200))
      .subscribe((value) => {
        this.onSearchChange(value);
      });
  }

  onSelectSearch(event: Search) {
    this.searchSelect = event;
    this.form.get('search')!.setValue('');
    this.options = [];
  }

  getTextSearch(option: TYPES): string {
    if (isUser(option)) {
      return option.username || option.email;
    } else if (isCarModel(option)) {
      return option.name;
    } else if (isMachine(option)) {
      return option.name;
    }
    return '';
  }

  onOptionSelected(option: MatAutocompleteSelectedEvent) {
    const selectedOption = option.option.value;
    // console.log(selectedOption);
    if (isUser(selectedOption)) {
      this._router.navigateByUrl(`/dashboard/user/${selectedOption.username}`);
    } else if (isCarModel(selectedOption)) {
      this._router.navigateByUrl(`/dashboard/car/${selectedOption.name}`);
    } else if (isMachine(selectedOption)) {
      this._router.navigateByUrl(`/dashboard/machine/${selectedOption.name}`);
    }
    this.onClose(true);
  }

  onClose(result: boolean) {
    this.dialogRef.close(result);
  }

  onSearchChange(value: string) {
    if (typeof value !== 'string' || value.trim() === '') {
      return;
    }
    switch (this.searchSelect.type) {
      case 'user': {
        this._userService.findUsersByUsername(value).subscribe({
          next: (response) => {
            this.options = [...response];
          },
          error: (error) => {
            console.error(error);
          },
        });
        break;
      }
      case 'car': {
        this._carModelService.findByName(value).subscribe({
          next: (response) => {
            this.options = [...response];
          },
          error: (error) => {
            console.error(error);
          },
        });
        break;
      }
      case 'machine': {
        this._machineService.findMachinesByName(value).subscribe({
          next: (response) => {
            this.options = [...response];
          },
          error: (error) => {
            console.error(error);
          },
        });
        break;
      }
      default: {
        console.error('Unknown search type');
      }
    }
  }
}
type TYPES = User | CarModel | Machines;

export interface Search {
  name: string;
  type: 'user' | 'car' | 'machine';
  icon: string;
}
