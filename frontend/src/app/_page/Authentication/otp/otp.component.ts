import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertEnum } from '../../../_model/_common/alert';
import { AlertService } from '../../../_service/_alert/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Environment } from '../../../../environments/environment';
import { PasswordRequest } from '../../../_model/_interface/password-request';
import { AuthenticationService } from '../../../_service/_http/authentication.service';
import { JwtService } from '../../../_service/_http/jwt.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  providers: [AuthenticationService],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss',
})
export class OtpComponent {
  formOtp!: FormGroup;
  formPassword!: FormGroup;
  isCorrectOTP: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _alertService: AlertService,
    private _activeRoute: ActivatedRoute,
    private _jwtService: JwtService,
    private _authentication: AuthenticationService,
    private _router: Router
  ) {
    this.formOtp = this._fb.group({
      otp: [null, [Validators.required]],
    });

    this.formPassword = this._fb.group({
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),
        ],
      ],
      pendingPassword: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),
        ],
      ],
    });
    this._activeRoute.queryParamMap.subscribe((params) => {
      this._jwtService.saveToken(Environment.jwtOtp, params.get('token')!);
    });
  }

  onCheck() {
    if (
      this.formOtp.get('otp')?.value ===
      this._jwtService.decodeToken(Environment.jwtOtp)?.sub
    ) {
      this.isCorrectOTP = true;
      this._alertService.show(
        'If the code is entered correctly, you can now change your password.',
        AlertEnum.SUCCESS
      );
    } else {
      this._alertService.show(
        'Code is wrong, please try again.',
        AlertEnum.ERROR
      );
    }
  }

  onSave() {
    this.formPassword.markAllAsTouched();
    if (
      this.formPassword.get('password')?.touched &&
      this.formPassword.get('password')?.invalid
    ) {
      if (this.formPassword.get('password')?.errors?.['required']) {
        this._alertService.show('Password is not valid.', AlertEnum.ERROR);
      }
      if (this.formPassword.get('password')?.errors?.['minlength']) {
        this._alertService.show(
          'Password need to have a length >= 8.',
          AlertEnum.ERROR
        );
      }
      if (this.formPassword.get('password')?.errors?.['pattern']) {
        this._alertService.show(
          'Password Must include uppercase, lowercase, and a number.',
          AlertEnum.ERROR
        );
      }
      return;
    }
    if (
      this.formPassword.get('pendingPassword')?.touched &&
      this.formPassword.get('pendingPassword')?.invalid
    ) {
      if (this.formPassword.get('pendingPassword')?.errors?.['required']) {
        this._alertService.show(
          'Password Confirm  is not valid.',
          AlertEnum.ERROR
        );
      }
      if (this.formPassword.get('pendingPassword')?.errors?.['minlength']) {
        this._alertService.show(
          'Password Confirm  need to have a length >= 8.',
          AlertEnum.ERROR
        );
      }
      if (this.formPassword.get('pendingPassword')?.errors?.['pattern']) {
        this._alertService.show(
          'Password Confirm must include uppercase, lowercase, and a number.',
          AlertEnum.ERROR
        );
      }
      return;
    }
    if (
      this.formPassword.get('password')?.value !==
      this.formPassword.get('pendingPassword')?.value
    ) {
      this._alertService.show(
        'Password and Confirmed Password need to be the same.',
        AlertEnum.ERROR
      );
      return;
    }

    const passwordRequest: PasswordRequest = {
      password: this.formPassword.get('password')?.value,
      email: this._jwtService.decodeToken(Environment.jwtOtp)?.email,
    };
    this._authentication.password(passwordRequest).subscribe({
      next: (response) => {
        this._alertService.show(response.message, AlertEnum.SUCCESS);
        this._router.navigate(['/authentication/login']);
      },
      error: (error) => {
        this._alertService.show(error.error.message, AlertEnum.ERROR);
      },
    });
  }

  onNumberInput(event: any): void {
    const input = event.target;
    input.value = input.value.replace(/\D/g, '');
    this.formOtp.get('otp')?.setValue(input.value);
  }
}
