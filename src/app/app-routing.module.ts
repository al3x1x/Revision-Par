import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstadosComponent } from './co/ada/forms/estados/estados/estados.component';
import { ProductosComponent } from './co/ada/forms/productos/productos.component';
import { PreguntasComponent } from './co/ada/forms/preguntas/preguntas.component';
import { RevisionparComponent } from './co/ada/forms/revisionpar/revisionpar.component';
import { ListarevisionparComponent } from './co/ada/forms/revisionpar/listarevisionpar/listarevisionpar.component';
import { DetallePreguntasProductosComponent } from './co/ada/forms/detalle-preguntas-productos/detalle-preguntas-productos.component';


const routes: Routes = [
  {path: 'productos', component: ProductosComponent},
  {path: 'preguntas', component: PreguntasComponent},
  {path: 'revisionPar', component: RevisionparComponent},
  {path: 'estados', component: EstadosComponent},
  {path:'listado-revision', component: ListarevisionparComponent},
  {path:'preguntasProducto', component: DetallePreguntasProductosComponent},
  {path: '**', pathMatch: 'full', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
