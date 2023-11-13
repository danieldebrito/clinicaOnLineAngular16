import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreSignUpRoutingModule } from './pre-sign-up-routing.module';
import { PreSignUpComponent } from './pre-sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PreSignUpComponent
  ],
  imports: [
    CommonModule,
    PreSignUpRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PreSignUpModule { }
