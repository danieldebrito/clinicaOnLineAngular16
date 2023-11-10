import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnoCardComponent } from './turno-card/turno-card.component';
import { TurnosListComponent } from './turnos-list/turnos-list.component';
import { BarraBusquedaComponent } from './barra-busqueda/barra-busqueda.component';
import { TurnosGridComponent } from './turnos-grid/turnos-grid.component';
import { TurnosGeneradorComponent } from './turnos-generador/turnos-generador.component';
import { TurnoDetalleComponent } from './turno-detalle/turno-detalle.component';
import { EspecialidadesModule } from '../../especialidades/especialidades.module';
import { EspecialistaComponentsModule } from '../../especialistas/components/especialista-components.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TurnoCardComponent,
    TurnosListComponent,
    BarraBusquedaComponent,
    TurnosGridComponent,
    TurnosGeneradorComponent,
    TurnoDetalleComponent
  ],
  imports: [
    CommonModule,
    EspecialistaComponentsModule,
    EspecialidadesModule,
    FormsModule
  ],
  exports: [
    TurnoCardComponent,
    TurnosListComponent,
    BarraBusquedaComponent,
    TurnosGridComponent,
    TurnosGeneradorComponent,
    TurnoDetalleComponent
  ]
})
export class TurnosComponentsModule { }
