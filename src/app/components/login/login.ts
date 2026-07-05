import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  //injectamos el router para rutas y FormBuilder para el formulario
  private fb = inject(FormBuilder);
  private router = inject(Router); 

  // definicion limpia del formulario y sus validadores reales
  contactoForm = this.fb.nonNullable.group({
    correoIngresado: ['', [Validators.required, Validators.email]],
    contraIngresada: ['', [Validators.required, Validators.minLength(6)]]
  });

  errorMensaje: string = '';

  verificarLogin() {
    // si el formulario es invalido, ni siquiera procesamos los datos
    if (this.contactoForm.invalid) {
      this.contactoForm.markAllAsTouched(); // Muestra los errores visuales al usuario
      return;
    }

    // extraemos los valores validados de forma segura
    const { correoIngresado, contraIngresada } = this.contactoForm.getRawValue();
    
    const correo = "deyvis@gmail.com";
    const contraseña = "123456";

    if (correoIngresado === correo && contraIngresada === contraseña) {
      localStorage.setItem('isLoggedIn', 'true'); 
      this.router.navigate(['/dashboard']);
    }
  }
}