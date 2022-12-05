import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorIntl } from "@angular/material/paginator";
import { RevisionparService } from '../../../../../service/revisionpar.service';
import { EstadosService } from '../../../../../service/estados.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../../../../service/producto.service';
import { PreguntaService } from '../../../../../service/pregunta.service';
import Swal from 'sweetalert2';
import { DetalleEncabezadoService } from 'src/app/service/detalle-encabezado.service';

@Component({
  selector: 'app-listarevisionpar',
  templateUrl: './listarevisionpar.component.html',
  styleUrls: ['./listarevisionpar.component.css']
})
export class ListarevisionparComponent implements OnInit {

  data: any[] = [];
  detalleRevisionXId!: any;
  lstEstados!: any;
  lstPreguntas!: any;
  lstProductos!: any;
  detalleRevision!: any;
  detalleEncabezado!: any;
  detalleCambioEstado!: any;
  formEstados!: FormGroup;
  formModalEditar!: FormGroup;
  estadoId!: {};

  constructor(private fb: FormBuilder,
    private paginador: MatPaginatorIntl,
    private auth: RevisionparService,
    private authEstados: EstadosService,
    private authProductos: ProductoService,
    private authPreguntas: PreguntaService,
    private authEncabezado: DetalleEncabezadoService
  ) {

    this.paginador.itemsPerPageLabel = "Registros por página";
    this.paginador.nextPageLabel = "Página siguiente";
    this.paginador.previousPageLabel = "Página anterior";
    this.paginador.firstPageLabel = "Primera página";
    this.paginador.lastPageLabel = "Última página";
  }

  ngOnInit(): void {

    this.listarRevisionesPares();
    this.listarEstados();
    this.listaProductos();
    this.listaPreguntas();
    this.listarEncabezado();

    this.formEstados = this.fb.group({
      estado: ["", Validators.required]
    });

    this.formModalEditar = this.fb.group({
      preguntas: ["", Validators.required],
      productoTrabajo: ["", Validators.required],
      version: [""],
      idRevisor: [""],
      idCreador: [""],
      usuarioElaboraId: [""],
      moduloRevisar: [""],
      proyecto: [""],
      cantidadHallazgos: ["", Validators.required],
      observacionHallazgo: ["", Validators.required],
      correctivasImplementar: ["", Validators.required],
      responsableImplCorrectiva: ["", Validators.required],
      cumple: ["", Validators.required]
    });

    // this.formModalEditar.get('clasificacionImpactos')?.disable();

  }

  displayedColumns: string[] = ['id', 'pregunta', 'producto',
    'hallazgos', 'observacion', 'correctivas', 'responsable', 'estado', 'acciones'];

  dataSource = new MatTableDataSource<any>(this.data);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  listarEncabezado(){
    this.authEncabezado.listarEncabezado().subscribe(
    (data: any) => {
      this.detalleEncabezado = data;
    }
  )
}

  listarRevisionesPares() {
    this.auth.listarDetalles().subscribe(
      (data: any) => {
        this.data = data;
      }
    )
  }

  listarDetalleId(id: number) {
    this.auth.listarDetalleXId(id).subscribe(
      (data: any) => {
        this.detalleRevisionXId = data;
      }
    )
  }

  listaProductos() {
    this.authProductos.listarProductos().subscribe(
      (data: any) => {
        this.lstProductos = data;
      }
    );
  }

  listaPreguntas() {
    this.authPreguntas.listarPreguntas().subscribe(
      (data: any) => {
        this.lstPreguntas = data;
      }
    );
  }

  listarEstados() {
    this.authEstados.listarEstados().subscribe(
      (data: any) => {
        this.lstEstados = data;
      }
    )
  }

  cambiarEstado(id: any) {

    let estado = Number(this.formEstados.get('estado')?.value);
    this.estadoId = {
      id: estado
    };

    this.auth.cambiarEstado(id, this.estadoId).subscribe(

      (data: any) => {
        Swal.fire({
          icon: 'success',
          text: 'Cambio de estado exitoso',
          title: 'Se ha cambiado el estado correctamente',
        });
        this.listarRevisionesPares();
      }
    )
  }

  editarRevisionPar(id: number) {
    let arreglo = this.armarJSON();

    Swal.fire({
      icon: 'info',
      text: 'Espere un momento',
      title: 'Enviando datos....',
    });

    Swal.showLoading();

    this.auth.editarDetalle(id, arreglo).subscribe(
      (data: any) => {
        Swal.close();

        Swal.fire({
          icon: 'success',
          text: 'Datos guardados correctamente',
          title: 'Se guardaron los datos exitosamente',
        });
        this.listarRevisionesPares();
        this.listarEncabezado();
      },
      err => {
        Swal.fire("Error", err.message, "error");
        console.log("error", err.message);
      }
    )
  }

  detalleEditar(id: number, data: any) {
    if (data.id === id) {
      this.detalleRevision = data;
    }
  }

  detalleEstado(id: number, data: any) {
    if (data.id === id) {
      this.detalleCambioEstado = data;
    }
  }

  // evaluarClasificacionXPregunta(idPregunta:any){

  //   let idP;
  //   let arreglo:any[] = [];
  //   for(let i of this.lstClasificacionImpactos){
  //    idP = i.preguntaId.id;
  //     arreglo = [idP];
  //     for(let j of arreglo){
  //       if(Number(idPregunta) === j){
  //         this.porcentajeClasificacionImpacto = i.porcentaje;
  //         this.idClasificacion = i.id;
  //       }
  //     }
  //   }    
  // }

  armarJSON() {

    let arregloCompleto = {};
    let pregunta = this.formModalEditar.get("preguntas")?.value || this.detalleRevision.preguntaId.id;

    let preguntas = {
      id: pregunta
    };

    let productoTrabajos = this.formModalEditar.get("productoTrabajo")?.value || this.detalleRevision.maeProductoTrabajo.id

    let productoTrabajo = {
      id: productoTrabajos
    };


    let version = this.formModalEditar.get("version")?.value || this.detalleRevision.version;
    let idRevisor = this.formModalEditar.get("idRevisor")?.value || this.detalleRevision.idRevisor;
    let usuarioElaboraId = this.formModalEditar.get("usuarioElaboraId")?.value || this.detalleRevision.usuarioElaboraId;
    let idCreador = this.formModalEditar.get("idCreador")?.value || this.detalleRevision.idCreador;
    let moduloRevisar = this.formModalEditar.get("moduloRevisar")?.value || this.detalleRevision.moduloRevisar;
    let proyecto = this.formModalEditar.get("proyecto")?.value || this.detalleRevision.proyecto;
    let cantidadHallazgos = this.formModalEditar.get("cantidadHallazgos")?.value || this.detalleRevision.cantidadHallazgos;
    let observacionHallazgo = this.formModalEditar.get("observacionHallazgo")?.value || this.detalleRevision.observacionHallazgo;
    let correctivasImplementar = this.formModalEditar.get("correctivasImplementar")?.value || this.detalleRevision.correctivasImplementar;
    let responsableImplCorrectiva = this.formModalEditar.get("responsableImplCorrectiva")?.value || this.detalleRevision.responsableImplCorrectiva;
    let cumple = this.formModalEditar.get("cumple")?.value || this.detalleRevision.cumple;

    arregloCompleto = {
      preguntas,
      productoTrabajo,
      version,
      idRevisor,
      usuarioElaboraId,
      moduloRevisar,
      idCreador,
      proyecto,
      cantidadHallazgos,
      observacionHallazgo,
      correctivasImplementar,
      responsableImplCorrectiva,
      cumple
    }
    return arregloCompleto;
  }

}