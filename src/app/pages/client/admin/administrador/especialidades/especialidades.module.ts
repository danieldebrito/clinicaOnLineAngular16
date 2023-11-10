import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspecialidadesRoutingModule } from './especialidades-routing.module';
import { EspecialidadesComponent } from './especialidades.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EspecialidadesListComponent } from './components/especialidades-list/especialidades-list.component';
import { EspecialidadesGridComponent } from './components/especialidades-grid/especialidades-grid.component';
import { EspecialidadesCardComponent } from './components/especialidades-card/especialidades-card.component';


@NgModule({
  declarations: [
    EspecialidadesComponent,
    EspecialidadesListComponent,
    EspecialidadesGridComponent,
    EspecialidadesCardComponent
  ],
  imports: [
    CommonModule,
    EspecialidadesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    EspecialidadesListComponent,
    EspecialidadesGridComponent
  ]
})
export class EspecialidadesModule { }
