import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NamePageComponent } from '../../../_components/name-page/name-page.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../_components/input/input.component';
import { NamePage } from '../../../_components/name-page/name-page';
import { GenInput } from '../../../_components/input/input';
import { UserRole } from '../../../_model/_enum/user-role';
import { UserService } from '../../../_service/_model/user.service';
import { Router } from '@angular/router';
import { User } from '../../../_model/_interface/user';
import { response } from 'express';
import { error } from 'console';
import { AlertEnum } from '../../../_model/_common/alert';
import { AlertService } from '../../../_service/_alert/alert.service';
import { JwtService } from '../../../_service/_http/jwt.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    InputComponent,
    ReactiveFormsModule,
    NamePageComponent,
    MatCardModule,
    HttpClientModule,
  ],
  providers: [provideNativeDateAdapter(), UserService],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  form!: FormGroup;
  page: NamePage = {
    name: 'Create User',
    icon: 'add',
  };
  configName: GenInput = {
    label: 'Name',
    icon: 'person',
    type: 'text',
    placeholder: 'Enter name',
    formControlName: 'name',
  };
  configEmail: GenInput = {
    label: 'Email',
    icon: 'mail',
    type: 'text',
    placeholder: 'Enter email',
    formControlName: 'email',
  };
  configRole: GenInput = {
    label: 'Role',
    icon: 'assignment_ind',
    type: 'select',
    placeholder: 'Select role',
    formControlName: 'role',
    options: Object.entries(UserRole).map(([key, value]) => ({ key, value })),
    labelKey: 'value',
    valueKey: 'key',
  };
  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _router: Router,
    private _alertService: AlertService,
    private _jwtService: JwtService
  ) {
    this.form = this._fb.group({
      name: [null, Validators.required],
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          updateOn: 'blur',
        },
      ],
      role: [null, Validators.required],
    });
  }

  onClick() {
    this.form.markAllAsTouched();
    let valid: boolean = false;
    this._userService.getUserByEmail(this.form.value.email).subscribe({
      next: (response) => {
        valid = response;
        if (response === true) {
          this._alertService.show(
            'The email address is incorrect. Please try another email address.',
            AlertEnum.ERROR
          );
        }
      },
      error: (error) => {
        console.log(error);
      },
    });

    if (
      this.form.get('name')?.hasError('required') &&
      this.form.get('name')?.touched
    ) {
      this._alertService.show('Name is required.', AlertEnum.ERROR);
    }
    if (
      this.form.get('email')?.hasError('required') &&
      this.form.get('email')?.touched
    ) {
      this._alertService.show('email is required.', AlertEnum.ERROR);
    }
    if (
      this.form.get('role')?.hasError('required') &&
      this.form.get('role')?.touched
    ) {
      this._alertService.show('Role is required.', AlertEnum.ERROR);
    }

    if (this.form.valid && !valid) {
      console.log('valid');
      const user: User = {
        id: '',
        name: this.form.value.name,
        email: this.form.value.email,
        password: '123asd,./ASDadasd2312./',
        role: this.form.value.role.key,
        createdAt: new Date(),
      };

      this._userService.postNewUser(user).subscribe({
        next: (response) => {
          this._alertService.show(
            'The user is to add successfully.',
            AlertEnum.SUCCESS
          );
          this._router.navigateByUrl('/dashboard/feed');
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
