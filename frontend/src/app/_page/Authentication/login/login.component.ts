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
import { HttpClientModule } from '@angular/common/http';
import { Environment } from '../../../../environments/environment';
import { LoginRequest } from '../../../_model/_interface/login-request';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../_service/_http/authentication.service';
import { JwtService } from '../../../_service/_http/jwt.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [AuthenticationService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _alertService: AlertService,
    private _authentication: AuthenticationService,
    private _jwtService: JwtService,
    private _router: Router
  ) {
    this._jwtService.logout(Environment.jwtToken);
    this._jwtService.logout(Environment.jwtOtp);

    this.form = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),
        ],
      ],
    });
  }

  onSave() {
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

    if (
      this.form.get('password')?.touched &&
      this.form.get('password')?.invalid
    ) {
      if (this.form.get('password')?.errors?.['required']) {
        this._alertService.show('Password is not valid.', AlertEnum.ERROR);
      }
      if (this.form.get('password')?.errors?.['minlength']) {
        this._alertService.show(
          'Password need to have a length >= 8.',
          AlertEnum.ERROR
        );
      }
      if (this.form.get('password')?.errors?.['pattern']) {
        this._alertService.show(
          'Must include uppercase, lowercase, and a number.',
          AlertEnum.ERROR
        );
      }
      return;
    }

    if (this.form.valid) {
      const userLogin: LoginRequest = {
        email: this.form.value.email,
        password: this.form.value.password,
      };

      this._authentication.login(userLogin).subscribe({
        next: (response) => {
          this._jwtService.saveToken(Environment.jwtToken, response.token);
          this._alertService.show('Login successful.', AlertEnum.SUCCESS);
          this._router.navigate(['/dashboard/feed']);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
