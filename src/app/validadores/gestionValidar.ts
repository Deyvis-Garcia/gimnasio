import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

export class GestionValidators{
    // reglas base reutilizables
    static readonly namePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    static readonly dniPattern = /^[0-9]{8}$/;
    static readonly phonePattern = /^9[0-9]{8}$/;

    //validaciones agrupadas para el formulario de registro
    static readonly registroForm = [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(GestionValidators.namePattern)
    ];
    static readonly dniForm = [
        Validators.required,
        Validators.pattern(GestionValidators.dniPattern)
    ];
    static readonly telefonoForm = [
        Validators.required,
        Validators.pattern(GestionValidators.phonePattern)
    ];
    static readonly fechaForm = [
        Validators.required
    ];
}