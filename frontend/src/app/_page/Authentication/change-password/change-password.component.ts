import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertService } from '../../../_service/_alert/alert.service';
import { AlertEnum } from '../../../_model/_common/alert';
import { Environment } from '../../../../environments/environment';
import { AuthenticationService } from '../../../_service/_http/authentication.service';
import { JwtService } from '../../../_service/_http/jwt.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  providers: [AuthenticationService],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  form!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _alertService: AlertService,
    private _authentication: AuthenticationService,
    private _jwtService: JwtService
  ) {
    this._jwtService.logout(Environment.jwtToken);
    this._jwtService.logout(Environment.jwtOtp);
    this.form = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  onSend() {
    this.form.markAllAsTouched();
    if (this.form.get('email')?.touched && this.form.get('email')?.invalid) {
      if (this.form.get('email')?.errors?.['required']) {
        this._alertService.show('Email is required.', AlertEnum.ERROR);
      }
      if (this.form.get('email')?.errors?.['email']) {
        this._alertService.show('Email is not valid.', AlertEnum.ERROR);
      }
      return;
    }
    if (this.form.valid) {
      this._authentication.mail(this.form.value.email).subscribe({
        next: (response) => {
          console.log('response', response);
          this._alertService.show(
            'Email sent successfully.',
            AlertEnum.SUCCESS
          );
        },
        error: (error) => {
          console.log('error', error);
          this._alertService.show('Error sending email.', AlertEnum.ERROR);
        },
      });
    }
  }
}
