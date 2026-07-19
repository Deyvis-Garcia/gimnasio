import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistroService, Asistencia } from '../../services/registro'; 
import { GestionValidators } from '../../validadores/gestionValidar';

@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Cambiado a ReactiveFormsModule
  templateUrl: './gestion.html',
  styleUrl: './gestion.css',
})

export class Gestion implements OnInit{
  // Inyección del servicio compartido
  private registroService = inject(RegistroService);
  private fb = inject(FormBuilder);

  registroForm!: FormGroup;
  tipo: 'socio' | 'entrenador' = 'socio';
  editandoIndex: number = -1;

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario(){
    this.registroForm = this.fb.group({
      nombre: ['', GestionValidators.registroForm],
      dni: ['', GestionValidators.dniForm],
      telefono: ['', GestionValidators.telefonoForm],
      fechaIngreso: ['', GestionValidators.fechaForm]
    });
  }

  //getter rápidos para usar en el HTML de forma sencilla
  get f(){return this.registroForm.controls}

  // Accedemos a las listas del servicio directamente
  obtenerListaFiltrada(): Asistencia[] {
    return this.tipo === 'socio' ? this.registroService.getSocios() : this.registroService.getEntrenadores();
  }
// Guardar nuevo registro usando el servicio verificando si es socio o entrenador
  guardarSocio() {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched(); 
      return;
    }
    // extraemos los valores tipados de forma segura 
    const datosFormulario = this.registroForm.value;
    if (this.editandoIndex === -1) {
        const nuevo: Asistencia = { ...datosFormulario, tipo: this.tipo };
      if (this.tipo === 'socio') {
        this.registroService.agregarSocio(nuevo);
      } else {
      this.registroService.agregarEntrenador(nuevo);
      }
    } else {
      // Actualizar registro existente directamente en la referencia del servicio
      const lista = this.obtenerListaFiltrada();
      lista[this.editandoIndex] = { ...datosFormulario, tipo: this.tipo };
    }
    this.limpiarFormulario();
  }
  //edita el registro seleccionado
  editarRegistro(index: number) {
    this.editandoIndex = index;
    const registroSeleccionado = this.obtenerListaFiltrada()[index];
    
    //parchamos los valores directo al formulario reactivo
    this.registroForm.patchValue({
      nombre: registroSeleccionado.nombre,
      dni: registroSeleccionado.dni,
      telefono: registroSeleccionado.telefono,
      fechaIngreso: registroSeleccionado.fechaIngreso
    });
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
    this.registroForm.reset();
    this.editandoIndex = -1;
  }
  // cambia el tipo entre socio y usuario
  cambioTipo(tipo: 'socio' | 'entrenador') {
    this.tipo = tipo;
    this.limpiarFormulario();
  }
}