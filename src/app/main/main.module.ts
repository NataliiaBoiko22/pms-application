import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainRoutingModule } from './main-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../material/material';
import { BoardBoxComponent } from './components/board-box/board-box.component';
import { BoardPageComponent } from './components/board-page/board-page.component';
import { LottieModule } from 'ngx-lottie';

@NgModule({
  declarations: [ProfileComponent, BoardBoxComponent, BoardPageComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    TranslateModule,
    FormsModule,

    ReactiveFormsModule,
    LottieModule,
  ],
})
export class MainModule {}
