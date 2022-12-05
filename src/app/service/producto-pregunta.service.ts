import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoPreguntaService {

  lstPreguntas:any;
  authURL =  `${environment.URL_BASE}calidad/ProductoPregunta/ProductoPregunta`;

  constructor() { }
}
