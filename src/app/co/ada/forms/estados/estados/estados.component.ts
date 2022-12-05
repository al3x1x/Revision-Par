import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Estados } from 'src/app/models/estados';
import { EstadosService } from 'src/app/service/estados.service';
import Swal from 'sweetalert2';
import {MatPaginatorIntl} from "@angular/material/paginator";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataSource } from '@angular/cdk/table';
import { PreguntaService } from 'src/app/service/pregunta.service';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.css']
})


export class EstadosComponent implements AfterViewInit, OnInit {

    data: any[] = [];
    dataGuardarEstado!: Estados;
    formModalEstados!:FormGroup; 
    detalleUsuaEstado!: any; 
    formModalEditarEstado!: FormGroup;
    listaEstado!: any;
   
   

    constructor( private paginador: MatPaginatorIntl, private auth: EstadosService, private fb : FormBuilder,
      private authEstado : EstadosService) {
        
    this.paginador.itemsPerPageLabel = "Registros por página";
    this.paginador.nextPageLabel ="Página siguiente";
    this.paginador.previousPageLabel = "Página anterior";
    this.paginador.firstPageLabel = "Primera página";
    this.paginador.lastPageLabel = "Última página";
    }
  
    ngOnInit(): void {
      this.listaEstados();
  
    
        this.formModalEstados = this.fb.group({
          estado:["", Validators.required],
        });

        this.formModalEditarEstado = this.fb.group({
          estado: ['', Validators.required]
        });
      
    
      }

    // guardarEstados(){
  
    //   Swal.fire({
    //     icon: 'info',
    //     text: 'Espere un momento',
    //     title: 'Enviando datos....',
    //   });
    //   Swal.showLoading();
        
    //   let estado = this.formModalEstados.get("estado")?.value
  
    //   let json = {
    //    "estado": estado
    //   }
  
    //     this.auth.guardarEstados(json).subscribe(
    //       (data:any)=>{
            
    //         Swal.close();
            
    //         Swal.fire({
    //           icon: 'success',
    //           text: 'Información editada correctamente',
    //           title: 'Se actualizaron los datos correctamente',
    //         });
    //         this.listaEstados();
  
    //       },err=>{
    //         Swal.fire("Error", err.error.message, "error");
    //         console.log("error ocurrido", err);
    //       }
    //     );
      
    // } 
  
    displayedColumns: string[] = ['id', 'estados', /*'fecha_registro',*/];
    dataSource = new MatTableDataSource<Estados>(this.data);
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }
  
    listaEstados(){
    
    this.auth.listarEstados().subscribe(
        (data : any)  => {
          this.data = data;
          console.log("respuesta servicio", data);
        }
      );
    }
  
    // detalleEditarEstados(id:number, data:any){
    //   console.log("data", data)
    //   if(data.id === id){
    //     this.detalleUsuaEstado = data;
    //   }
  
    // }
  
    // editarEstados(id:number){
    //   let estado = this.formModalEditarEstado.get("estado")?.value
  
    //   let json = {
    //     estado
    //   }
  
    //   if(estado != null){
    
    // this.auth.editarEstados(id, json).subscribe(
    //     (data: any)=>{
    //         console.log("info retornada", data);
    //         Swal.fire({
    //           icon: 'success',
    //           text: 'Información editada correctamente',
    //           title: 'Se actualizaron los datos correctamente',
    //         });
    //         this.listaEstados();
    //     }, err=>{
    //       console.log("error", err.message)
    //     }
    // )
    //   }else{
    //     Swal.fire({
    //       icon: 'error',
    //       text: 'Debe indicar un estado'
    //     });
    //   }
    // }
  
    // listarEstadosPr(){
  
    //   this.authEstadosPreguntas.listarEstados().subscribe(
    //     (data:any)=>{
    //       this.listaEstadoPregunta = data;
    //       console.log("info estados", this.listaEstadoPregunta);
    //     }
    //   )
  
    // }
  
    // cambiarEstadoPregunta(id:number){
    
    //   let estado = Number(this.formCambiarEstado.get('estado')?.value);
        
    //   let json ={
    //     "id":estado
    //   };
      
    //    this.auth.cambiarEstado(id, json).subscribe(
          
    //      (data:any)=>{
    //        Swal.fire({
    //          icon: 'success',
    //          text: 'Cambio de estado exitoso',
    //          title: 'Se ha cambiado el estado correctamente',
    //        });
    //        this.listaPreguntas();
    //      }
    //    )
  
    // }  
  
  
    // detalleEstado(id:number, data:any){
    //   if(data.id === id){
    //     this.detalleCambioEstado = data;
    //   }
    // }
  
  }