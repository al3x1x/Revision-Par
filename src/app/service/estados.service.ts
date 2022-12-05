import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Estados } from '../models/estados';

@Injectable({
  providedIn: 'root'
})
export class EstadosService{
  
    lstEstados:any;
    authURL = `${environment.URL_BASE}calidad/estados/estados`;

    constructor(private httpClient: HttpClient) {}
  
    listarEstados(){
      return this.httpClient.get(`${this.authURL}/listarEstados`).pipe(
        tap(
          (resp: any)=>{
           this.lstEstados = resp;
          }
        )
      );
  }

  guardarEstados(estado: {}){
    return this.httpClient.post(`${this.authURL}/guardarEstados`, estado);
  }

  detalleEstados(id:number){
    return this.httpClient.get(`${this.authURL}/listarEstados/${id}`);
  }

  editarEstados(id:number, detalle:any){
    return this.httpClient.put(`${this.authURL}/actualizarEstados/${id}`, detalle);
  }

  

}
