import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms'

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],

      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    });

  }

  isInvalid(controlName: string, errorCode: string): boolean {

    const control = this.form.get(controlName);

    if (!control) {
      return false;
    }

    return control.hasError(errorCode) && control.touched;
  }

  onSubmit(): void {

    if (this.form.valid) {

      const email = this.form.value.email;
      const password = this.form.value.password;

      console.log('Correo:', email);
      console.log('Contraseña:', password);

      // Aquí posteriormente puedes realizar
      // la autenticación contra tu backend.

    } else {

      this.form.markAllAsTouched();

    }

  }

}

