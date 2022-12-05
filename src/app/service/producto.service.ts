import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })  

  export class ProductoService{

    
    authURL =  `${environment.URL_BASE}calidad/producto/productoTrabajo`;

    constructor(private httpClient: HttpClient) {}
    

  listarProductos(){
        return this.httpClient.get(`${this.authURL}/listarProducto`);
  }

  guardarProducto(datosGuardar:any){
    return this.httpClient.post(`${this.authURL}/guardarProducto`, datosGuardar);
  }

  detalleProducto(id:number){
    return this.httpClient.get(`${this.authURL}/listarProducto/${id}`);
  }

  editarProducto(id:number, envioDatos:{}){
    return this.httpClient.put(`${this.authURL}/actualizarProducto/${id}`, envioDatos);
  }
  
  cambiarEstado(id:number, detalle:any){
    return this.httpClient.put(`${this.authURL}/cambiarEstadoProductoTrabajo/${id}`, detalle);
  }


}