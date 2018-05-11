export class ValoracionModel {

   constructor(public id: number,
               public categoriaId: number,
               public elementoId: number,
               public valoracion: number,
               public descripcion: string,
               public imagen: string ) {
   }
 }