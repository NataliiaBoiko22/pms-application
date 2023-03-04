import { Component } from '@angular/core';
import { patterns } from './singup.constants';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpBody } from 'src/app/core/types/auth.types';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss'],
})
export class SingupComponent {
  authForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(patterns.MIN_LENGTH),
      Validators.maxLength(patterns.MAX_LENGTH),
      Validators.pattern(patterns.PATTERN_NAME),
    ]),
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(patterns.MIN_LENGTH),
      Validators.maxLength(patterns.MAX_LENGTH),
      Validators.pattern(patterns.PATTERN_PASSWORD),
    ]),
  });

  controlName = this.authForm.get('name') as FormControl;

  controlLogin = this.authForm.get('login') as FormControl;

  controlPassword = this.authForm.get('password') as FormControl;

  constructor(private auth: AuthService) {}

  onSingUpButton(): void {
    if (this.authForm.invalid) {
      return;
    }
    const data = this.authForm.value as SignUpBody;
    this.auth.signUp(data);
  }
}
