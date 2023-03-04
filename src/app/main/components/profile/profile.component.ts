import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { patterns } from 'src/app/auth/components/singup/singup.constants';
import { PopUpService } from 'src/app/core/services/pop-up.service';
import { ProfileService } from '../../services/profile.service';
import { HttpService } from 'src/app/core/services/http.service';
import { SignUpBody } from 'src/app/core/types/auth.types';
import { take } from 'rxjs';
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
    private userService: ProfileService,
    private modalService: PopUpService,
    private apiService: HttpService
  ) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId') as string;
    setTimeout(() => {
      this.apiService.getUser(userId).subscribe((value) => {
        if ('_id' in value) {
          this.controlName.setValue(value.name);
          this.controlLogin.setValue(value.login);
        }
        return value;
      });
    }, 0);
  }

  changeUserData(): void {
    if (this.userUpdateForm.invalid) {
      return;
    }
    const data = this.userUpdateForm.value as SignUpBody;
    const userId = localStorage.getItem('userId') as string;
    this.userService.updateUser(userId, data);
  }

  deleteUser(): void {
    this.modalService.modalHandler$.next({
      type: 'confirm',
      emitter: 'User',
      action: 'delete',
      payload: '',
    });
    this.modalService.modalEmitter$.pipe(take(1)).subscribe((result) => {
      if (result === 'confirm') {
        const userId = localStorage.getItem('userId') as string;
        this.userService.deleteUser(userId);
      }
      return;
    });
  }
}
