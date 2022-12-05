import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';
import { Preguntas } from '../models/preguntas';

@Injectable({
    providedIn: 'root'
  })

  export class PreguntaService{
  
    lstPreguntas:any;
    authURL =  `${environment.URL_BASE}calidad/preguntas/preguntas`;

    constructor(private httpClient: HttpClient) {}
  
    listarPreguntas(){
      return this.httpClient.get(`${this.authURL}/listarPreguntas`).pipe(
        tap(
          (resp: any)=>{
           this.lstPreguntas = resp;
          }
        )
      );
  }

  guardarPregunta(pregunta: {}){
    return this.httpClient.post(`${this.authURL}/guardarPreguntas`, pregunta);
  }

  detallePregunta(id:number){
    return this.httpClient.get(`${this.authURL}/listarPreguntas/${id}`);
  }

  editarPreguntas(id:number, detalle:{}){
    return this.httpClient.put(`${this.authURL}/actualizarPreguntas/${id}`, detalle);
  }

  cambiarEstado(id:number, detalle:any){
    return this.httpClient.put(`${this.authURL}/cambiarEstadoPreguntas/${id}`, detalle);
  }

}
