import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCatchaDirective } from './my-captcha.directive';
import { HoverCardDirective } from './hover-card.directive';

@NgModule({
  declarations: [
    MyCatchaDirective,
    HoverCardDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MyCatchaDirective,
    HoverCardDirective
  ]
})
export class DirectivesModule { }
