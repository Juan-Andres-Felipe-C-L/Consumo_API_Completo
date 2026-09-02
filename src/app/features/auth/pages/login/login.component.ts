import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms'

import { RegisterUser } from '../../model/register-user.model';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  form: FormGroup;

  userData: RegisterUser | null = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        userName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_]+$')]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
        age: [null, [Validators.required, Validators.min(15), Validators.max(90)]],
        check: ['', [Validators.requiredTrue]]
      },
      {
        validators: this.passwordMatchValidator()
      }
    );
  }

  passwordMatchValidator(): ValidatorFn {

    return (form: AbstractControl): ValidationErrors | null => {

      const password = form.get('password');
      const confirmPassword = form.get('confirmPassword');

      if (!password || !confirmPassword) {
        return null;
      }

      if (password.value !== confirmPassword.value) {
        return { confirmPassword: true };
      }

      return null;

    };

  }

  isInvalid(controlName: string, errorCode: string): boolean {

    const control = this.form.get(controlName);

    if (!control) {
      return false;
    }

    if (
      controlName === 'confirmPassword' &&
      errorCode === 'confirmPassword'
    ) {

      return !!this.form.errors?.['confirmPassword']
            && control.touched;

    }

    return control.hasError(errorCode) && control.touched;

  }

  onClick(): void {

    if (this.form.valid) {

      this.userData = {
        name: this.form.value.name!,
        email: this.form.value.email!,
        userName: this.form.value.userName!,
        age: this.form.value.age!
      };

      console.log(this.userData);

    } else {

      this.form.markAllAsTouched();

    }

  }
    /*onClick() {
  console.log('Se hizo clic');
  }*/
}
