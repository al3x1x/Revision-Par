import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })

  export class RevisionparService{
    
    authURL =  `${environment.URL_BASE}maestros/calidad/detalle`;
    
     constructor(private httpClient:HttpClient){
     }

    listarDetalles(){
        return this.httpClient.get(`${this.authURL}/listarDetalles`)
    }
    
    listarDetalleXId(id:number){
      return this.httpClient.get(`${this.authURL}/detalleRevisionPar/${id}`)
    }

    guardarDetalles(revisionPar: {}){
        return this.httpClient.post(`${this.authURL}/guardarDetalle`, revisionPar);
    }

    editarDetalle(id:number, data: {}){
      return this.httpClient.put(`${this.authURL}/editarRevisionPar/${id}`, data);
    }
  
    cambiarEstado(id:number, maeEstados: {}){
      return this.httpClient.put(`${this.authURL}/cambiarEstado/${id}`, maeEstados);
    }

  }