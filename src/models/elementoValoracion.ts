export class ElementoValoracionModel {

   constructor(public id: number,
               public categoriaId: number,
               public nombreElemento: string,
               public imagen: string,
               public valoracion: number,
               public descripcion: string ) {
   }
 }