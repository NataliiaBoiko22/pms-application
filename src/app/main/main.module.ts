import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainRoutingModule } from './main-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../material/material';
@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    TranslateModule,
    FormsModule,

    ReactiveFormsModule,
  ],
})
export class MainModule {}
