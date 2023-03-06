import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { patterns } from 'src/app/auth/components/singup/singup.constants';
import { ProfileService } from '../../services/profile.service';
import { HttpService } from 'src/app/core/services/http.service';
import { SignUpBody } from 'src/app/core/types/auth.types';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  userUpdateForm = new FormGroup({
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

  controlName = this.userUpdateForm.get('name') as FormControl;

  controlLogin = this.userUpdateForm.get('login') as FormControl;

  controlPassword = this.userUpdateForm.get('password') as FormControl;

  constructor(
    private profileService: ProfileService,
    private apiService: HttpService
  ) {}

  async ngOnInit() {
    const userId = localStorage.getItem('userId') as string;

    this.apiService.getUser(userId).subscribe((value) => {
      if ('_id' in value) {
        this.controlName.setValue(value.name);
        this.controlLogin.setValue(value.login);
      }
      return value;
    });
  }

  changeUserData(): void {
    if (this.userUpdateForm.invalid) {
      return;
    }
    const data = this.userUpdateForm.value as SignUpBody;
    const userId = localStorage.getItem('userId') as string;
    this.profileService.updateUser(userId, data);
  }

  deleteUser(): void {
    const userId = localStorage.getItem('userId') as string;
    this.profileService.deleteUser(userId);
  }
}
