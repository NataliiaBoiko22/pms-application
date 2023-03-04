import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

import { TranslateService } from '@ngx-translate/core';
import { PopUpService } from '../../services/pop-up.service';
import { take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from 'src/app/main/components/profile/profile.component';
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
    private modalService: PopUpService,
    public translate: TranslateService,
    public prof: MatDialog
  ) {}

  ngOnInit(): void {
    this.translate.currentLang = localStorage.getItem('lang') || 'en';
  }

  openProfileUser(): void {
    this.prof.open(ProfileComponent);
  }

  logOut() {}

  saveToLocal(lang: string): void {
    localStorage.setItem('lang', lang);
    this.translate.use(lang);
  }
}
