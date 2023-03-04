import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsOwnerMarkDirective } from './directives/is-owner-mark.directive';



@NgModule({
  declarations: [
    IsOwnerMarkDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
