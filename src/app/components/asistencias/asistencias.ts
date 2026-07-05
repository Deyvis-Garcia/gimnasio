import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistroService} from '../../services/registro';

@Component({
  selector: 'app-clases',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './asistencias.html',
  styleUrl: './asistencias.css',
})

export class Asistencias {
  //injecto el registro que esta en el servicio
  private registroService = inject(RegistroService);
//listo todas las clases que ya se registraron
  get listaClases() {
    return this.registroService.getClases();
  }

}
