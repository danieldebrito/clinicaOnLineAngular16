import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../auth/class/usuario';

@Pipe({
  name: 'nombreApellidoPipe',
})
export class NombreApellidoPipe implements PipeTransform {
  transform(value: Usuario): unknown {

    return value.nombre + ' ' + value.apellido;
  }
}
