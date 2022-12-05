import { Component, OnInit, ViewChild } from '@angular/core';
import { RevisionparService } from 'src/app/service/revisionpar.service';
import { RevisionPar } from '../../../../models/revisionpar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProductoService } from 'src/app/service/producto.service';
import { PreguntaService } from '../../../../service/pregunta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-revisionpar',
  templateUrl: './revisionpar.component.html',
  styleUrls: ['./revisionpar.component.css']
})
export class RevisionparComponent implements OnInit {

  formRevisionPar!: FormGroup;
  datosGuardar!: RevisionPar;
  lstProductos!: any;
  lstPreguntas!: any;
  porcentajeClasificacionImpacto!: number;
  idClasificacion!: any;
  ProductosPreguntas!: any;
  listaPreguntas: any;
  data: any[] = [];
  id: number = 0;
  isShown: boolean = false;
  displayStyle = "none";
  nombrePregunta:  string= '';
  preguntaid!: number;
  


  constructor(
    private authRevisionPar: RevisionparService,
    private formBuilder: FormBuilder,
    private authProductos: ProductoService,
    private authPreguntas: PreguntaService,
    private router: Router,
  ) {

    this.listarPreguntas();

  }

  ngOnInit(): void {

    this.listarPreguntas();
    this.listaProductos();


      this.formRevisionPar = this.formBuilder.group({
        preguntas: ["", ],
        productoTrabajo: ["", ],
        idCreador: ["", ],
        version: ["", ],
        idRevisor: ["", ],
        usuarioElaboraId: ["", ],
        moduloRevisar: ["", ],
        proyecto: ["", ],
        cantidadHallazgos: ["",],
        observacionHallazgo: ["", ],
        correctivasImplementar: ["", ],
        responsableImplCorrectiva: ["", ],
        cumple: ["", ]
      });
  }

  guardarDetalleRevision() {

    let arreglo = this.armarJSON();

    if (this.formRevisionPar.invalid) {
      Swal.fire("Error", "Debe de llenar los campos para ingresar", "error");
      return;
    }

    Swal.fire({
      icon: 'info',
      text: 'Espere un momento',
      title: 'Enviando datos....',
    });
    Swal.showLoading();

    this.datosGuardar = this.formRevisionPar.value;
    this.authRevisionPar.guardarDetalles(arreglo).subscribe(
      (data: any) => {
        Swal.close();

        Swal.fire({
          icon: 'success',
          text: 'Datos guardados correctamente',
          title: 'Se guardaron los datos exitosamente',
        });
        this.formRevisionPar.reset(); 
        console.log("info retornada", data);
      },
      err => {
        Swal.fire("Error", err.message, "error");
        console.log("error", err.message);
      }
    )
  }


  listarPreguntas() {
    this.authPreguntas.listarPreguntas().subscribe(
      (data: any) => {
        this.listaPreguntas = data;
      }
    );

    console.log("preguntasService", this.listaPreguntas);
  }

  listadoRevisionesPares() {
    this.router.navigate(["listado-revision"]);
  }

  mostrarDetalle() {
    this.router.navigate(["revision-Par"]);
  }

  listaProductos() {

    this.authProductos.listarProductos().subscribe(
      (data: any) => {
        this.lstProductos = data;
      }
    );
  }

  // evaluarClasificacionXPregunta(idPregunta: any) {

  //   let idP;
  //   let arreglo: any[] = [];
  //   for (let i of this.lstClasificacionImpactos) {
  //     idP = i.preguntaId.id;
  //     arreglo = [idP];
  //     for (let j of arreglo) {
  //       if (Number(idPregunta) === j) {
  //         this.porcentajeClasificacionImpacto = i.porcentaje;
  //         this.idClasificacion = i.id;
  //       }
  //     }
  //   }
  // }


  armarJSON() {

    let pregunta = this.formRevisionPar.get('preguntas')?.value;
    let arregloCompleto = {};
    let preguntas = {
      id: this.preguntaid
    }
    
    let productoTrabajos = this.formRevisionPar.get('productoTrabajo')?.value;
    let productoTrabajo = {
      id: productoTrabajos
    };

    let version = this.formRevisionPar.get('version')?.value;
    let idCreador = this.formRevisionPar.get('idCreador')?.value;
    let idRevisor = this.formRevisionPar.get('idRevisor')?.value;
    let usuarioElaboraId = this.formRevisionPar.get('usuarioElaboraId')?.value;
    let moduloRevisar = this.formRevisionPar.get('moduloRevisar')?.value;
    let proyecto = this.formRevisionPar.get('proyecto')?.value;
    let cantidadHallazgos = this.formRevisionPar.get('cantidadHallazgos')?.value;
    let observacionHallazgo = this.formRevisionPar.get('observacionHallazgo')?.value;
    let correctivasImplementar = this.formRevisionPar.get('correctivasImplementar')?.value;
    let responsableImplCorrectiva = this.formRevisionPar.get('responsableImplCorrectiva')?.value;
    let cumple = this.formRevisionPar.get('cumple')?.value;

    arregloCompleto = {
      preguntas,
      productoTrabajo,
      version,
      idCreador,
      idRevisor,
      usuarioElaboraId,
      moduloRevisar,
      proyecto,
      cantidadHallazgos,
      observacionHallazgo,
      correctivasImplementar,
      responsableImplCorrectiva,
      cumple
    }
    console.log(arregloCompleto)
    return arregloCompleto;
  }



  capturar() {
    let productoTrabajos = this.formRevisionPar.get('productoTrabajo')?.value;
    console.log(productoTrabajos)
  }




  openPopup(nombrePregunta: string, preguntaid: number) {
    this.displayStyle = "block";
    this.nombrePregunta= nombrePregunta;
    this.preguntaid=preguntaid
  }

  closePopup() {
    this.displayStyle = "none";
  }


  toggleShow() {
    let productoTrabajos = this.formRevisionPar.get('productoTrabajo')?.value;
    false != this.isShown
    true != !this.isShown

    if (productoTrabajos != '') {
      this.isShown = true;
      console.log('Valor del select', productoTrabajos)
      // this.isShown=!this.isShown
      // this.isShown=this.isShown
    } else {
      this.isShown = false
    }
  }

  changeSelect() {

    let productoTrabajos = this.formRevisionPar.get('productoTrabajo')?.value;

    if (productoTrabajos === "Producto1") {
      console.log("Has seleccionado este valor: ", productoTrabajos)




      this.displayStyle = "block";

    }

  }
}
