import { Estados } from './estados';
import { Preguntas } from './preguntas';
import { Producto } from './producto';

export interface RevisionPar{

     preguntas:Preguntas;
	 productoTrabajo:Producto;
	 idCreador: number;
	 version:string;
	 idRevisor:number;
	 usuarioElaboraId:number;
	 moduloRevisar:string;
	 proyecto:string;
	 cantidadHallazgos:number;
	 observacionHallazgo:string;
	 correctivasImplementar:string;
	 responsableImplCorrectiva:string;
	 cumple:string;
	 estados: Estados;
}
