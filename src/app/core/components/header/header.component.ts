import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

import { TranslateService } from '@ngx-translate/core';


import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from 'src/app/main/components/profile/profile.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isSingIn = false;

  isSingInBehavior = this.auth.isSingIn$.subscribe((value) => {
    this.isSingIn = value;
    return value;
  });
  constructor(
    private auth: AuthService,

    public translate: TranslateService,
    public prof: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.translate.currentLang = localStorage.getItem('lang') || 'en';
  }

  openProfileUser(): void {
    this.prof.open(ProfileComponent);
  }

  logOut(): void {
    // this.isSingIn$.next(false);
    localStorage.clear();
    this.router.navigateByUrl('/welcome');
    this.auth.logOut();
  }

  saveToLocal(lang: string): void {
    localStorage.setItem('lang', lang);
    this.translate.use(lang);
  }
}
