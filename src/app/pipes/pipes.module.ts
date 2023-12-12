import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloMedicoSexoPipe } from './titulo-medico-sexo.pipe';

@NgModule({
  declarations: [TituloMedicoSexoPipe],
  imports: [CommonModule],
  exports: [TituloMedicoSexoPipe],
})
export class PipesModule {}
