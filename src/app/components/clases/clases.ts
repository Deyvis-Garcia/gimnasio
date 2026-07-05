import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistroService, ClaseRegistrada } from '../../services/registro';

@Component({
  selector: 'app-clases',
  standalone: true, 
  imports: [FormsModule, CommonModule],
  templateUrl: './clases.html',
  styleUrl: './clases.css',
})
export class Clases {
  private registroService = inject(RegistroService);

  // obtengo socios,entrenadores y clases mediante la clase get
  get sociosDisponibles() {
    return this.registroService.getSocios();
  }

  get entrenadoresDisponibles() {
    return this.registroService.getEntrenadores();
  }

  get listaClases() {
    return this.registroService.getClases();
  }

  // Modelo del formulario clases
  nuevaClase: ClaseRegistrada = {
    socio: '',
    clase: '',
    entrenador: '',
    horaInicio: '',
    horaFin: '',
    fecha: '',
    estado: 'asistio'
  };
//aqui le damos -1 porque el formulario esta vacio y luego se agrega se remplaza el -1
  editandoIndex: number = -1;
// registramos una clase
  registrarClase() {
    if (
      this.nuevaClase.socio && 
      this.nuevaClase.clase && 
      this.nuevaClase.entrenador && 
      this.nuevaClase.horaInicio && 
      this.nuevaClase.horaFin && 
      this.nuevaClase.fecha && 
      this.nuevaClase.estado
    ) {
      //Añadimos una nueva clase al servicio y Si es -1, significa que no venimos de ninguna fila guardada
      if (this.editandoIndex === -1) {
        this.registroService.agregarClase({ ...this.nuevaClase });
      } else {
        this.listaClases[this.editandoIndex] = { ...this.nuevaClase };
      }
      //significa que estamos modificando una fila existente en esa posicion exacta
      this.limpiarFormulario();
    } else {
      alert('Por favor, complete todos los campos del formulario.');
    }
  }
  //obtengo el indice donde el usuario hace click para editar
  editarClase(index: number) {
    this.editandoIndex = index;
    this.nuevaClase = { ...this.listaClases[index] };
  }
//capturo el indice en que hace click el usuario para eliminarlo
  eliminarClase(index: number) {
    if (confirm('¿Está seguro de que desea eliminar esta clase registrada?')) {
      this.listaClases.splice(index, 1);
      if (this.editandoIndex === index) {
        this.limpiarFormulario();
      }
    }
  }
  //por cada registro se limpia el formulario
  limpiarFormulario() {
    this.nuevaClase = {
      socio: '',
      clase: '',
      entrenador: '',
      horaInicio: '',
      horaFin: '',
      fecha: '',
      estado: 'asistio'
    };
    this.editandoIndex = -1;
  }
}