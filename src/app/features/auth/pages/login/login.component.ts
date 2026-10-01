
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { LoginRequest } from '../../models/login-request.model';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  form: FormGroup;

  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.form = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],

      password: ['', [
        Validators.required,
        Validators.minLength(9)
      ]]
    });

  }

  isInvalid(controlName: string, errorCode: string): boolean {

    const control = this.form.get(controlName);

    return !!control &&
      control.hasError(errorCode) &&
      control.touched;
  }

  onSubmit(): void {

    this.errorMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    const credentials: LoginRequest = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.authService.login(credentials).subscribe({

      next: (response) => {
        this.loading = false;
        this.authService.saveSession(response);
        this.router.navigateByUrl(
          this.authService.getDashboardRoute(response.user.role)
        );
      },

      error: (error) => {

        this.loading = false;

        console.error('Error en login:', error);

        if (error.status === 401) {
          this.errorMessage =
            'El correo o la contraseña son incorrectos.';
        } else {
          this.errorMessage =
            'No fue posible iniciar sesión. Inténtelo nuevamente.';
        }

      }

    });
  }

}
