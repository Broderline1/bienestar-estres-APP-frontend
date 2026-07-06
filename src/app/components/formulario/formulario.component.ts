import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BienestarService, DatosBienestar, ResultadoBienestar } from '../../services/bienestar.service';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

  // Ya no tiene los 3 campos que quitamos
  datos: DatosBienestar = {
    edad: 0,
    genero: '',
    ocupacion: '',
    horas_sueno: 0,
    actividad_fisica: 0,
    pasos_diarios: 0,
    bmi_categoria: ''
  };

  resultado: ResultadoBienestar | null = null;
  cargando: boolean = false;
  error: string = '';

  constructor(
    private bienestarService: BienestarService,
    private cdr: ChangeDetectorRef
  ) {}

  enviar() {
    this.cargando = true;
    this.error = '';
    this.resultado = null;

    this.bienestarService.predecir(this.datos).subscribe({
      next: (respuesta) => {
        this.resultado = respuesta;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Hubo un error al conectar con el servidor. Verifica que el backend esté corriendo.';
        this.cargando = false;
        this.cdr.detectChanges();
        console.error(err);
      }
    });
  }

  limpiar() {
    this.resultado = null;
    this.error = '';
    this.datos = {
      edad: 0,
      genero: '',
      ocupacion: '',
      horas_sueno: 0,
      actividad_fisica: 0,
      pasos_diarios: 0,
      bmi_categoria: ''
    };
    this.cdr.detectChanges();
  }
}