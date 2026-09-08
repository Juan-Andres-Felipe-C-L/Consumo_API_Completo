
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { AuthService } from '../../../../core/services/auth.service';

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
    private authService: AuthService
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

    const credentials = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.authService.login(credentials).subscribe({

      next: (response) => {

        this.loading = false;

        console.log('Login exitoso:', response);

        // Guardar tokens
        localStorage.setItem(
          'accessToken',
          response.accessToken
        );

        localStorage.setItem(
          'refreshToken',
          response.refreshToken
        );

        // Guardar información del usuario
        localStorage.setItem(
          'user',
          JSON.stringify(response.user)
        );

        console.log('Usuario:', response.user);

        // Aquí posteriormente puedes redireccionar
        // al usuario a la página principal.

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
