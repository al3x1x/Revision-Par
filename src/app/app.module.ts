import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductosComponent } from './co/ada/forms/productos/productos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { PreguntasComponent } from './co/ada/forms/preguntas/preguntas.component';
import { RevisionparComponent } from './co/ada/forms/revisionpar/revisionpar.component';
import { ListarevisionparComponent } from './co/ada/forms/revisionpar/listarevisionpar/listarevisionpar.component';
import { EstadosComponent } from './co/ada/forms/estados/estados/estados.component';
import { DetallePreguntasProductosComponent } from './co/ada/forms/detalle-preguntas-productos/detalle-preguntas-productos.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    EstadosComponent,
    ProductosComponent, 
    PreguntasComponent, RevisionparComponent, 
    PreguntasComponent, 
    RevisionparComponent, ListarevisionparComponent,  DetallePreguntasProductosComponent,
    
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    BrowserModule,
    AppRoutingModule, 
    FormsModule, BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
