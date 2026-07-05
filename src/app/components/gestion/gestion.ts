import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistroService, Asistencia } from '../../services/registro'; 

@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './gestion.html',
  styleUrl: './gestion.css',
})
export class Gestion {
  // Inyección del servicio compartido
  private registroService = inject(RegistroService);

  socio = { nombre: '', dni: '', telefono: '', fechaIngreso: '' };
  tipo: 'socio' | 'entrenador' = 'socio';
  editandoIndex: number = -1;

  // Accedemos a las listas del servicio directamente
  obtenerListaFiltrada(): Asistencia[] {
    return this.tipo === 'socio' ? this.registroService.getSocios() : this.registroService.getEntrenadores();
  }
// Guardar nuevo registro usando el servicio verificando si es socio o entrenador
  guardarSocio() {
    if (this.socio.nombre && this.socio.dni && this.socio.telefono && this.socio.fechaIngreso) {
      
      if (this.editandoIndex === -1) {
        const nuevo: Asistencia = { ...this.socio, tipo: this.tipo };
        if (this.tipo === 'socio') {
          this.registroService.agregarSocio(nuevo);
        } else {
          this.registroService.agregarEntrenador(nuevo);
        }
      } else {
        // Actualizar registro existente directamente en la referencia del servicio
        const lista = this.obtenerListaFiltrada();
        lista[this.editandoIndex] = { ...this.socio, tipo: this.tipo };
      }

      this.limpiarFormulario();
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }
  //edita el registro seleccionado
  editarRegistro(index: number) {
    this.editandoIndex = index;
    const registroSeleccionado = this.obtenerListaFiltrada()[index];
    this.socio = { ...registroSeleccionado };
  }
  //eliminar el registro seleccionado
  eliminarRegistro(index: number) {
    if (confirm('¿Desea eliminar este registro?')) {
      const lista = this.obtenerListaFiltrada();
      lista.splice(index, 1);
      if (this.editandoIndex === index) this.limpiarFormulario();
    }
  }
  // limpia el formulario
  limpiarFormulario() {
    this.socio = { nombre: '', dni: '', telefono: '', fechaIngreso: '' };
    this.editandoIndex = -1;
  }
  // cambia el tipo entre socio y usuario
  cambioTipo(tipo: 'socio' | 'entrenador') {
    this.tipo = tipo;
    this.limpiarFormulario();
  }
}