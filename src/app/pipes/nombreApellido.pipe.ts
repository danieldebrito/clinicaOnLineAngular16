import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../auth/class/usuario';

@Pipe({
  name: 'nombreApellidoPipe',
})
export class NombreApellidoPipe implements PipeTransform {
  transform(value: Usuario): string {
    if (value) {
      const nombre = this.capitalizeFirstLetter(value.nombre);
      const apellido = this.capitalizeFirstLetter(value.apellido);
      return `${nombre} ${apellido}`;
    }
    return '';
  }

  private capitalizeFirstLetter(word: string): string {
    if (!word) {
      return ''; // o puedes manejar esto según tus necesidades
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
}
