import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginatorIntl, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoPregunta} from 'src/app/models/detallepreguntasproductos';
import { Estados } from 'src/app/models/estados';
import { DetalleProductosPreguntasService } from 'src/app/service/detallepreguntasproductos';
import { EstadosService } from 'src/app/service/estados.service';
import { PreguntaService } from 'src/app/service/pregunta.service';
import { ProductoPreguntaService } from 'src/app/service/producto-pregunta.service';
import { ProductoService } from 'src/app/service/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-preguntas-productos',
  templateUrl: './detalle-preguntas-productos.component.html',
  styleUrls: ['./detalle-preguntas-productos.component.css']
})
export class DetallePreguntasProductosComponent implements OnInit {

  data: any[] = [];
  listaEstado!: any;
  lstProductos!: any;
  lstPreguntas!: any;
  formModal!: FormGroup;
  detalleUsuario: any;
  datosGuardar!: {};
  formModalPreguntas!: FormGroup;
  idProducto!:number;
  idPregunta!:number;
  checksListasPreguntas: number [] = [];
  isShown: boolean = false;
 

  constructor( private paginador: MatPaginatorIntl,  private fb : FormBuilder,
    private authProductos : ProductoService, 
    private authPreguntas: PreguntaService,
    private authPreguntasProductos: DetalleProductosPreguntasService) {
      
  this.paginador.itemsPerPageLabel = "Registros por página";
  this.paginador.nextPageLabel ="Página siguiente";
  this.paginador.previousPageLabel = "Página anterior";
  this.paginador.firstPageLabel = "Primera página";
  this.paginador.lastPageLabel = "Última página";
  
  }

  ngOnInit(): void {

 

    this.listaProductos();
    this.listarPreguntas();

    this.formModal = this.fb.group({
      pregunta: ["", Validators.required],
      producto: ["", Validators.required],
    });


    }

  productoId(id: any){
    this.idProducto= id.target.value 
    console.log("respuesta servicio id prueba", id.target.value);
  }

  idChecksPreguntas(id:any, check:any){
    let checked = check.target.checked;
    console.log("respuesta servicio id preguntas check 1", checked, id);
    if(checked == true){
      this.checksListasPreguntas.push(id)
    }else{
      this.checksListasPreguntas.splice(this.checksListasPreguntas.indexOf(id), 1)
    }
    //llamar el metodo que va a enviar la data y enviar como parametro checksListasPreguntas, y this.idProducto
    console.log("respuesta servicio check lista preguntas", this.checksListasPreguntas, this.idProducto);
    this.authPreguntasProductos.guardarProductoPregunta(this.checksListasPreguntas);
    
  }

  listaProductosPreguntas() {

    this.authPreguntasProductos.listarProductoPregunta().subscribe(
      (data: any) => {
        this.listaProductosPreguntas = data;
        console.log("respuesta servicio", this.listaProductosPreguntas);
      }
    );
  }

  detalleEditar(id: number, data: any) {
    console.log("data", data)
    if (data.id === id) {
      this.detalleUsuario = data;
    }

  }


  listaProductos() {

    this.authProductos.listarProductos().subscribe(
      (data: any) => {
        this.lstProductos = data;
        console.log("listar productos", this.lstProductos);
      }
    );
  }

  listarPreguntas() {
    this.authPreguntas.listarPreguntas().subscribe(
      (data: any) => {
        this.lstPreguntas = data;
        console.log("listar preguntas", this.lstPreguntas);
      }
    );
  }

  

  guardarProductoPregunta() {


      Swal.fire({
        icon: 'info',
        text: 'Espere un momento',
        title: 'Enviando datos....',
      });
      Swal.showLoading();


      let pruebaIdPregunta = this.checksListasPreguntas.map(id => ({id}))

      console.log(pruebaIdPregunta)

       

      const json = {

        maePreguntas :pruebaIdPregunta, maeProductoTrabajo: { id:this.idProducto} 
        //maePreguntas: [{ preguntaId: { id:this.idPregunta} , maeProductoTrabajo :{ id:pruebaIdPregunta}}]
         //productoPregunta: [{ productoId: { id:this.idProducto} , preguntaId :{ id:pruebaIdPregunta}}]
      }

      console.log(json);
      

      this.authPreguntasProductos.guardarProductoPregunta(json).subscribe(

        (data: any) => {

          data=this.data

          Swal.close();

          Swal.fire({
            icon: 'success',
            text: 'Datos guardados correctamente',
            title: 'Se guardaron los datos exitosamente',
          });
          this.lstPreguntas;
          console.log("preguntas guardar", this.checksListasPreguntas);
        }, err => {
          Swal.fire("Error", err.error.message, "error");
        }
      );
  }








  // organizarArreglo() {
  //   let arreglo = {};
  //   let pregunta = Number(this.formModal.get('pregunta')?.value);
  //   let producto = this.formModal.get('producto')?.value || this.detalleUsuario.producto;

  //   let estadoId = {
  //     id: 2
  //   };

  //   let preguntaId = {
  //     id: pregunta
  //   };

  //   arreglo = {
  //     preguntaId,
  //     producto,
  //     estadoId
  //   }
  //   return arreglo;
  // }

 
    


}


// function onCategoriaPressed(categoriaSelected: any, any: any, checked: any, boolean: any) {
//   throw new Error('Function not implemented.');
// }

