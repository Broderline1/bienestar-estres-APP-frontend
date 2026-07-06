import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ResultadoBienestar {
  nivel_estres: string;
  calidad_sueno_predicha: number;
  mensaje: string;
}

// Ya no tiene ritmo_cardiaco, presion_sistolica ni presion_diastolica
export interface DatosBienestar {
  edad: number;
  genero: string;
  ocupacion: string;
  horas_sueno: number;
  actividad_fisica: number;
  pasos_diarios: number;
  bmi_categoria: string;
}

@Injectable({
  providedIn: 'root'
})
export class BienestarService {

  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  predecir(datos: DatosBienestar): Observable<ResultadoBienestar> {
    return this.http.post<ResultadoBienestar>(`${this.apiUrl}/predecir`, datos);
  }
}