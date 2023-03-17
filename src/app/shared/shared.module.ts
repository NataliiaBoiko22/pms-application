import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsOwnerMarkDirective } from './directives/is-owner-mark.directive';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '../core/core.module';
@NgModule({
  declarations: [IsOwnerMarkDirective],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,

    CoreModule,
  ],
  exports: [
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    IsOwnerMarkDirective,
  ],
})
export class SharedModule {}
