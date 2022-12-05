import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorIntl } from "@angular/material/paginator";
import { PreguntaService } from 'src/app/service/pregunta.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Preguntas } from '../../../../models/preguntas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements AfterViewInit, OnInit {

  data: any[] = [];
  dataGuardarPregunta!: Preguntas;
  formModalPreguntas!: FormGroup;
  detalleUsuaPregunta!: any;
  formModalEditarPregunta!: FormGroup;
  detalleCambioEstado!: any;

  constructor(private paginador: MatPaginatorIntl,
    private auth: PreguntaService,
    private fb: FormBuilder,
  ) {

    this.paginador.itemsPerPageLabel = "Registros por página";
    this.paginador.nextPageLabel = "Página siguiente";
    this.paginador.previousPageLabel = "Página anterior";
    this.paginador.firstPageLabel = "Primera página";
    this.paginador.lastPageLabel = "Última página";
  }

  ngOnInit(): void {

    this.listaPreguntas();

    this.formModalPreguntas = this.fb.group({
      pregunta: ['', Validators.required],
      porcentaje: ['', Validators.required],
      estados: ['', Validators.required]
    });

    this.formModalEditarPregunta = this.fb.group({
      pregunta: [''],
      porcentaje: [''],
      estados: ['']
    });
  }


  guardarPregunta() {
      if(this.formModalPreguntas.invalid){
        Swal.fire("Error", "Debe de llenar los campos para ingresar", "error");
        return;
      }

      Swal.fire({
        icon: 'info',
        text: 'Espere un momento',
        title: 'Enviando datos....',
      });
      Swal.showLoading();

  const json = { pregunta: this.formModalPreguntas.get("pregunta")?.value ,
      porcentaje: this.formModalPreguntas.get("porcentaje")?.value,
      estados: this.formModalPreguntas.get("estados")?.value
    }
    console.log("respuesta servicio", json);
      

      this.auth.guardarPregunta(json).subscribe(
        (data: any) => {

          Swal.close();

          Swal.fire({
            icon: 'success',
            text: 'Datos guardados correctamente',
            title: 'Se guardaron los datos exitosamente',
          });
          this.listaPreguntas();
          this.formModalPreguntas.reset(); 
        }, err => {
          Swal.fire("Error", err.error.message, "error");
        }
      );
  }

   

displayedColumns: string[] = ['id', 'preguntas', 'porcentaje', 'estados','acciones'];
dataSource = new MatTableDataSource<Preguntas>(this.data);

@ViewChild(MatPaginator) paginator!: MatPaginator;

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}


listaPreguntas() {
  this.auth.listarPreguntas().subscribe(
    (data: any) => {
      this.data = data;
      console.log("respuesta servicio", data);
    }
  );
}

detalleEditarPregunta(id: number, data: any) {
  console.log("data", data)
  if (data.id === id) {
    this.detalleUsuaPregunta = data;
  }
}






// detalleEditar(id: number, data: any) {
//   console.log("data", data)
//   if (data.id === id) {
//     this.detalleUsuario = data;
//   }

// }

// editar(id: number) {

//   let arreglo = this.organizarArreglo();
//   this.auth.editarProducto(id, arreglo).subscribe(
//     (data: any) => {
//       Swal.fire({
//         icon: 'success',
//         text: 'Información editada correctamente',
//         title: 'Se actualizaron los datos correctamente',
//       });
//       this.listaProductos();
//       console.log("datos editar", this.listaProductos())
//     }, err => {
//       Swal.fire("Error", err.message, "error");
//     }
//   )

// }
// organizarArreglo() {
//   let arreglo = {};
//   let pregunta = this.formModalEditarPregunta.get('pregunta')?.value || this.detalleUsuaPregunta.pregunta;
//   let porcentaje = this.formModalEditarPregunta.get('porcentaje')?.value || this.detalleUsuaPregunta.porcentaje;
//   let estados = this.formModalEditarPregunta.get('estados')?.value || this.detalleUsuaPregunta.estados;

//   arreglo = {
//     pregunta,
//     porcentaje,
//     estados,
//   }
//   return arreglo;
// }

editarPreguntas(id: number) {
  let pregunta = this.formModalEditarPregunta.get("pregunta")?.value || this.detalleUsuaPregunta.pregunta;
  let porcentaje = this.formModalEditarPregunta.get("porcentaje")?.value || this.detalleUsuaPregunta.porcentaje;
  let estados = this.formModalEditarPregunta.get("estados")?.value || this.detalleUsuaPregunta.estados;
  const json = {
    pregunta,
    porcentaje,
    estados,
  }
  console.log('json:', json)
  if (json.pregunta != '', json.porcentaje != undefined, json.estados != '') {

    this.auth.editarPreguntas(id, json).subscribe(
      (data: any) => {
        console.log("info retornada", data);
        Swal.fire({
          icon: 'success',
          text: 'Información editada correctamente',
          title: 'Se actualizaron los datos correctamente',
        });
        this.listaPreguntas();
      }, err => {
        console.log("error", err.message)
      }
    )
  } else {
    Swal.fire({
      icon: 'error',
      text: 'Debe indicar una pregunta'
    });
  }
}
}




