import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { patterns } from './singin.costants';
import { SignInBody } from '../../../core/types/auth.types';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormStyle } from '@angular/common';
@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.scss'],
})
export class SinginComponent {
  constructor(private auth: AuthService) {}

  authForm = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(patterns.MIN_LENGTH),
      Validators.pattern(patterns.PATTERN_PASSWORD),
    ]),
  });

  controlLogin = this.authForm.get('login') as FormControl;

  controlPassword = this.authForm.get('password') as FormControl;

  onSingInButton(): void {
    const data = this.authForm.value as SignInBody;
    if (this.authForm.invalid) {
      return;
    }
    this.auth.singIn(data);
  }
}
