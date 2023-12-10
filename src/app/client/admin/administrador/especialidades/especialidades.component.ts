import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Especialidad } from 'src/app/class/especialidad';
import { EspecialidadesService } from 'src/app/services/especialidades.service';


@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.scss']
})
export class EspecialidadesComponent implements OnInit {

  public showAdd: boolean = false;
  public especialidades: Especialidad[] = [];


  createForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(6)]),
    duracionTurno: new FormControl( 30, [Validators.required, Validators.minLength(2)]),
  });

  constructor( private especialidadesSv: EspecialidadesService) { }
  
    public create() {
    if (this.createForm.valid) {


      const newItem: Especialidad = {
        //id: this.createForm.value.id ?? '',
        //emailVerified: this.createForm.value.emailVerified ?? '',

        nombre: this.createForm.value.nombre ?? '',
        duracionTurno: this.createForm.value.duracionTurno ?? 30,
        habilitado: true ?? '',
      };

      this.especialidadesSv.addItem(newItem);

      console.log(newItem);
      this.ChangeView();
    } else {
      console.log("El formulario no es válido, realiza alguna acción o muestra un mensaje de error.");
      // El formulario no es válido, realiza alguna acción o muestra un mensaje de error.
    }
  }



  public ChangeView(){
    this.showAdd = !this.showAdd;
  }

  public getEspecialidades(){
    this.especialidadesSv.getItems().subscribe( res => {
      this.especialidades = res;
      
      console.log(this.especialidades);
    } );
  }

  ngOnInit(): void {
    this.getEspecialidades();
  }


}
