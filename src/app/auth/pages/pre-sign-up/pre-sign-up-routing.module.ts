import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreSignUpComponent } from './pre-sign-up.component';

const routes: Routes = [{ path: '', component: PreSignUpComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreSignUpRoutingModule { }
