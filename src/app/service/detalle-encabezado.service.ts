import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetalleEncabezadoService {

  authURL =  `${environment.URL_BASE}calidad/encabezado/encabezadoRevision`;
    
  constructor(private httpClient:HttpClient){
  }

 listarEncabezado(){
     return this.httpClient.get(`${this.authURL}/listarEncabezado`)
 }
 

 guardarEncabezado(encabezadoRevision: {}){
     return this.httpClient.post(`${this.authURL}/guardarEncabezado`, encabezadoRevision);
 }
}
