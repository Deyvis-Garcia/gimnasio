import { Injectable } from '@angular/core';
//creacion de dos interface para clases y asistencias
export interface Asistencia {
  nombre: string;
  dni: string;
  telefono: string;
  fechaIngreso: string;
  tipo: 'socio' | 'entrenador';
}

export interface ClaseRegistrada {
  socio: string;
  clase: string;
  entrenador: string;
  horaInicio: string;
  horaFin: string;
  fecha: string;
  estado: 'asistio' | 'no asistio'; // Guardado de manera interna
}
//servicio unificado
@Injectable({
  providedIn: 'root' // mantiene el patron Singleton para toda la app
})
export class RegistroService {

  // Listas de datos privados
  private listaSocios: Asistencia[] = [
    { nombre: 'Juan Pérez', dni: '12345678', telefono: '987654321', fechaIngreso: '2023-01-01', tipo: 'socio' },
    { nombre: 'Carlos López', dni: '45678912', telefono: '987123456', fechaIngreso: '2023-03-10', tipo: 'socio' },
    { nombre: 'María García', dni: '78912345', telefono: '987987654', fechaIngreso: '2023-05-15', tipo: 'socio' },
    { nombre: 'María Gómez', dni: '23456789', telefono: '912345678', fechaIngreso: '2023-06-20', tipo: 'socio' },
    { nombre: 'Carlos Ruiz', dni: '34567890', telefono: '923456789', fechaIngreso: '2023-06-18', tipo: 'socio' },
    { nombre: 'Lucía Torres', dni: '45612378', telefono: '934567812', fechaIngreso: '2023-06-24', tipo: 'socio' }
  ];

  private listaEntrenadores: Asistencia[] = [
    { nombre: 'Ana Torres', dni: '23456789', telefono: '987654321', fechaIngreso: '2023-02-20', tipo: 'entrenador' },
    { nombre: 'Luis Fernández', dni: '56789123', telefono: '987123456', fechaIngreso: '2023-04-05', tipo: 'entrenador' },
    { nombre: 'Sofía Ramírez', dni: '89123456', telefono: '987987654', fechaIngreso: '2023-06-12', tipo: 'entrenador' }
  ];

  private listaClases: ClaseRegistrada[] = [
    { socio: 'Juan Pérez', clase: 'Musculación', entrenador: 'Ana Torres', horaInicio: '07:00', horaFin: '08:00', fecha: '2026-06-25', estado: 'asistio' },
    { socio: 'María Gómez', clase: 'Yoga', entrenador: 'Luis Fernández', horaInicio: '08:00', horaFin: '10:00', fecha: '2026-06-25', estado: 'asistio' },
    { socio: 'Carlos Ruiz', clase: 'Cardio', entrenador: 'Sofía Ramírez', horaInicio: '12:00', horaFin: '14:00', fecha: '2026-06-25', estado: 'asistio' },
    { socio: 'Lucía Torres', clase: 'Spinning', entrenador: 'Ana Torres', horaInicio: '10:00', horaFin: '12:00', fecha: '2026-06-24', estado: 'no asistio' },
    { socio: 'Juan Pérez', clase: 'Musculación', entrenador: 'Ana Torres', horaInicio: '07:00', horaFin: '08:00', fecha: '2026-06-25', estado: 'no asistio' },
    { socio: 'María Gómez', clase: 'Yoga', entrenador: 'Luis Fernández', horaInicio: '08:00', horaFin: '10:00', fecha: '2026-06-25', estado: 'asistio' },
    { socio: 'Carlos Ruiz', clase: 'Cardio', entrenador: 'Sofía Ramírez', horaInicio: '12:00', horaFin: '14:00', fecha: '2026-06-25', estado: 'asistio' },
    { socio: 'Lucía Torres', clase: 'Spinning', entrenador: 'Ana Torres', horaInicio: '10:00', horaFin: '12:00', fecha: '2026-06-24', estado: 'asistio' }
  ];
//metodos para socios
  getSocios(): Asistencia[] {
    return this.listaSocios;
  }

  agregarSocio(socio: Asistencia) {
    this.listaSocios.push(socio);
  }
//metodos para entrenadores
  getEntrenadores(): Asistencia[] {
    return this.listaEntrenadores;
  }

  agregarEntrenador(entrenador: Asistencia) {
    this.listaEntrenadores.push(entrenador);
  }
  //metodos para clases
  getClases(): ClaseRegistrada[] {
    return this.listaClases;
  }

  agregarClase(nuevaClase: ClaseRegistrada) {
    this.listaClases.push(nuevaClase);
  }
}