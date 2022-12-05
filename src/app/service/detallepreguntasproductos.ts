import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })

  export class DetalleProductosPreguntasService{

    
    authURL =  `${environment.URL_BASE}calidad/productoPregunta/productoPregunta`;
    

     constructor(private httpClient:HttpClient){

     }

     listarProductoPregunta(){
      return this.httpClient.get(`${this.authURL}/listarProductoPregunta`);
    } 

    guardarProductoPregunta(datosGuardar: {}){
        return this.httpClient.post(`${this.authURL}/guardarProductoPregunta`, datosGuardar );
    }



  }