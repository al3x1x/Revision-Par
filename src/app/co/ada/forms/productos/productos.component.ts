import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorIntl } from "@angular/material/paginator";
import { ProductoService } from '../../../../service/producto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { EstadosService } from '../../../../service/estados.service';
import { PreguntaService } from 'src/app/service/pregunta.service';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements AfterViewInit, OnInit {

  data: any[] = [];
  formModalProductos!: FormGroup;
  formModal!: FormGroup;
  detalleUsuario!: any;
  formCambiarEstado!: FormGroup;
  listaEstado!: any;
  listaPreguntas!: any;
  datosGuardar!: {};
  detalleCambioEstado!: any;
  listaEstadoPregunta!: any;
  formModalEditarProducto!: FormGroup;
  
  constructor(private paginador: MatPaginatorIntl,
    private auth: ProductoService,
    private fb: FormBuilder,
    private authPreguntas: PreguntaService 
  ) {


    this.paginador.itemsPerPageLabel = "Registros por página";
    this.paginador.nextPageLabel = "Página siguiente";
    this.paginador.previousPageLabel = "Página anterior";
    this.paginador.firstPageLabel = "Primera página";
    this.paginador.lastPageLabel = "Última página";
  }

  ngOnInit(): void {
    this.listaProductos();
    this.listarPreguntas();

    this.formModal = this.fb.group({
      producto: ["", Validators.required],
      // pregunta: ["", Validators.required],
      estados: ["", Validators.required],

    });
  }

  guardarProducto() {
      if(this.formModal.invalid){
        Swal.fire("Error", "Debe de llenar los campos para ingresar", "error");
        return;
      }
      Swal.fire({
        icon: 'info',
        text: 'Espere un momento',
        title: 'Enviando datos....',
      });
      Swal.showLoading();

      // let pregunta = {
      //   id: this.formModal.get("pregunta")?.value
      // }

      const json = {
        producto: this.formModal.get("producto")?.value,
        estados: this.formModal.get("estados")?.value,
      }
      console.log('Json: ', json)

      this.auth.guardarProducto(json).subscribe(
        (data: any) => {
          data = this.data;
          console.log('valores', data)

          Swal.close();

          Swal.fire({
            icon: 'success',
            text: 'Datos guardados correctamente',
            title: 'Se guardaron los datos exitosamente',
          });
          this.listaProductos();
          this.formModal.reset(); 
        }, err => {
          Swal.fire("Error", err.error.message, "error");
        }
      );
    }

  displayedColumns: string[] = ['id', 'producto', 'estados', 'acciones'];
  dataSource = new MatTableDataSource<Producto>(this.data);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  listaProductos() {

    this.auth.listarProductos().subscribe(
      (data: any) => {
        this.data = data;
        console.log("respuesta servicio", data);
      }
    );
  }

  detalleEditar(id: number, data: any) {
    console.log("data", data)
    if (data.id === id) {
      this.detalleUsuario = data;
    }

  }

  editar(id: number) {

    let arreglo = this.organizarArreglo();
    this.auth.editarProducto(id, arreglo).subscribe(
      (data: any) => {
        Swal.fire({
          icon: 'success',
          text: 'Información editada correctamente',
          title: 'Se actualizaron los datos correctamente',
        });
        this.listaProductos();
        console.log("datos editar", this.listaProductos())
      }, err => {
        Swal.fire("Error", err.message, "error");
      }
    )

  }
    organizarArreglo() {
      let arreglo = {};
      let producto = this.formModal.get('producto')?.value || this.detalleUsuario.producto;
      let estados = this.formModal.get('estados')?.value || this.detalleUsuario.producto;


      arreglo = {
        producto,
        estados,
      }
      return arreglo;
    }

  listarPreguntas() {

    this.authPreguntas.listarPreguntas().subscribe(
      (data: any) => {
        this.listaPreguntas = data;
      }
    );

    console.log("preguntasService", this.listaPreguntas);
  }


  

}





