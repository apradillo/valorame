import { Injectable } from "@angular/core";

import { LocalStorageService } from "../providers/localStorage";

import { PagingModel } from "../models/paging";
import { LoginModel } from './../models/login';
import { ComboModel } from "../models/combo";
import { CategoriaModel } from "../models/categoria";
import { ElementoModel } from "../models/elemento";
import { ValoracionModel } from "../models/valoracion";
import { UtilsService } from "./utils";

@Injectable()
export class ApiService {
   data: any;

   constructor(public localStorage: LocalStorageService,
               public utilService: UtilsService) {
      this.data = null;
   }

   getCategorias(_busqueda?: string, start?: number, limit?: number): Promise<PagingModel<CategoriaModel>> {
    return new Promise<PagingModel<CategoriaModel>>((resolve, reject) => {
          this.localStorage.get("categorias")
         .then((data) => {
            let result: any = data;
            if (_busqueda != undefined && _busqueda != null && _busqueda.trim().length > 0) {
               result = result.filter(f => f.nombreCategoria.indexOf(_busqueda)>0);
            }
            let total = result.length;
            if (start == undefined || start == null) {
                start = 0;
            }
            if (limit == undefined || limit == null) {
                limit = total;
            }
            let returnCollection: CategoriaModel[] = new Array();
            for (let i = 0; i < result.length; ++i) {
               let item: any = result[i];
               returnCollection.push(new CategoriaModel(
                  item["id"],
                  item["nombreCategoria"]
               ))
            }
            resolve(new PagingModel<CategoriaModel>(this.utilService.paginate(returnCollection, limit, start), total));
         })
         .catch((err) => {
            reject(err);
         });
      })
   }

   getCategoriaById(_categoriaId: number ): Promise<CategoriaModel> {
      return new Promise<CategoriaModel>((resolve, reject) => {
         this.localStorage.get("categorias")
         .then((data) => {
            let result: any = data;
            if (_categoriaId != undefined && _categoriaId != null && _categoriaId > 0) {
               result = result.filter(f => f.id = _categoriaId);
            } 
            let returnItem: CategoriaModel;
            for (let i = 0; i < result.length; ++i) {
               let item: any = result[i];
               returnItem = new CategoriaModel(
                  item["id"],
                  item["nombreCategoria"]
               )
            }
            resolve(returnItem);
         })
         .catch((err) => {
            reject(err);
         });
      })
   }

   saveCategoria(_categoria: CategoriaModel): Promise<CategoriaModel> {
      return new Promise<CategoriaModel>((resolve, reject) => {
         let currentData: PagingModel<CategoriaModel>;
         this.getCategorias()
         .then((data) => {
            currentData = data;
            if (_categoria.id < 0) {
                let id: number = 1;
                if (currentData != undefined && currentData != null && currentData.items.length > 0) {
                    id = currentData.items.length + 1;
                 }
                 _categoria.id = id;
            }
            currentData.items.push(_categoria);
            this.localStorage.set("categorias", currentData)
            .then((data) => {
                if (data) {
                  this.getCategoriaById(_categoria.id)
                  .then((data) => {
                      debugger;
                     resolve(data);
                  })
                  .catch((err) => {
                     reject(err);
                  });
               } else {
                  reject("No se ha podido guardar la categoría.");
               }
            })
            .catch((err) => {
               reject(err);
            });
         })
         .catch((err) => {
            reject(err);
         });
      });
   }

   deleteCategoria(_categoria: CategoriaModel): Promise<boolean> {
      return new Promise<boolean>((resolve, reject) => {
         let currentData: PagingModel<CategoriaModel>;
         this.getCategorias()
         .then((data) => {
             debugger;
            currentData = data;
            for (let i = 0; i < currentData.items.length; ++i) {
               let item: CategoriaModel = currentData[i];
               if (item.id == _categoria.id) {
                  currentData.items.splice(i, 1);
               }
            }
            this.localStorage.set("categorias", currentData)
            .then((data) => {
               if (data) {
                  resolve(data);
               } else {
                  reject("No se ha podido eliminar la categoría.");
               }
            })
            .catch((err) => {
               reject(err);
            });
         })
         .catch((err) => {
            reject(err);
         });
      });
   }

   getElementos( _categoriaId?: number , _busqueda?: string, start?: number, limit?: number ): Promise<PagingModel<ElementoModel>> {
      return new Promise<PagingModel<ElementoModel>>((resolve, reject) => {
         this.localStorage.get("elementos")
         .then((data) => {
            let result: any = data;
            if (_categoriaId != undefined && _categoriaId != null && _categoriaId > 0) {
               result = result.filter(f => f.categoriaId = _categoriaId);
            } 
            if (_busqueda != undefined && _busqueda != null && _busqueda.trim().length > 0) {
               result = result.filter(f => f.nombreCategoria.indexOf(_busqueda)>0);
            }
            let total = result.length;
            if (start == undefined || start == null) {
                start = 0;
            }
            if (limit == undefined || limit == null) {
                limit = total;
            }
            let returnCollection: ElementoModel[] = new Array();
            for (let i = 0; i < result.length; ++i) {
               let item: any = result[i];
               returnCollection.push(new ElementoModel(
                  item["id"],
                  item["categoriaId"],
                  item["nombreElemento"],
                  item["imagen"]
               ));
            }
            resolve(new PagingModel<ElementoModel>(this.utilService.paginate(returnCollection, limit, start), total));
         })
         .catch((err) => {
            reject(err);
         });
      })
   }

   getElementoById(_elementoId: number ): Promise<ElementoModel> {
      return new Promise<ElementoModel>((resolve, reject) => {
         this.localStorage.get("elementos")
         .then((data) => {
            let result: any = data;
            debugger;
            if (_elementoId != undefined && _elementoId != null && _elementoId > 0) {
               result = result.filter(f => f.id = _elementoId);
            } 
            let returnItem: ElementoModel;
            for (let i = 0; i < result.length; ++i) {
               let item: any = result[i];
               returnItem = new ElementoModel(
                  item["id"],
                  item["categoriaId"],
                  item["nombreElemento"],
                  item["imagen"]
               )
            }
            resolve(returnItem);
         })
         .catch((err) => {
            reject(err);
         });
      })
   }

   saveElemento(_elemento: ElementoModel): Promise<ElementoModel> {
      return new Promise<ElementoModel>((resolve, reject) => {
         let currentData: PagingModel<ElementoModel>;
         debugger;
         let id: number = 1;
         this.getElementos()
         .then((data) => {
            currentData = data;
            if (_elemento.id < 0) {
                let id: number = 1;
                if (currentData != undefined && currentData != null && currentData.items.length > 0) {
                    id = currentData.items.length + 1;
                 }
                 _elemento.id = id;
            }
            currentData.items.push(_elemento);
            this.localStorage.set("elementos", currentData)
            .then((data) => {
               if (data) {
                  this.getElementoById(_elemento.id)
                  .then((data) => {
                     resolve(data);
                  })
                  .catch((err) => {
                     reject(err);
                  });
               } else {
                  reject("No se ha podido guardar el elemento.");
               }
            })
            .catch((err) => {
               reject(err);
            });
         })
         .catch((err) => {
            reject(err);
         });
      });
   }

   deleteElemento(_elemento: ElementoModel): Promise<boolean> {
      return new Promise<boolean>((resolve, reject) => {
         let currentData: PagingModel<ElementoModel>;
         this.getElementos()
         .then((data) => {
            currentData = data;
            for (let i = 0; i < currentData.items.length; ++i) {
               let item: ElementoModel = currentData[i];
               if (item.id == _elemento.id) {
                  currentData.items.splice(i, 1);
               }
            }
            this.localStorage.set("elementos", currentData)
            .then((data) => {
               if (data) {
                  resolve(data);
               } else {
                  reject("No se ha podido eliminar el elemento.");
               }
            })
            .catch((err) => {
               reject(err);
            });
         })
         .catch((err) => {
            reject(err);
         });
      });
   }

   getValoraciones(_categoriaId?: number, _elementoId?: number, start?: number, limit?: number): Promise<PagingModel<ValoracionModel>> {
      return new Promise<PagingModel<ValoracionModel>>((resolve, reject) => {
         this.localStorage.get("valoraciones")
         .then((data) => {
            let result: any = data;
            if (_categoriaId != undefined && _categoriaId != null && _categoriaId > 0) {
               result = result.filter(f => f.categoriaId = _categoriaId);
            } 
            if (_elementoId != undefined && _elementoId != null && _elementoId > 0) {
               result = result.filter(f => f.elementoId = _elementoId);
            } 
            let total = result.length;
            if (start == undefined || start == null) {
                start = 0;
            }
            if (limit == undefined || limit == null) {
                limit = total;
            }
            let returnCollection: ValoracionModel[] = new Array();
            for (let i = 0; i < result.length; ++i) {
               let item: any = result[i];
               returnCollection.push(new ValoracionModel(
                  item["id"],
                  item["categoriaId"],
                  item["elementoId"],
                  item["valoracion"],
                  item["descripcion"],
                  item["imagen"]
               ))
            }
            resolve(new PagingModel<ValoracionModel>(this.utilService.paginate(returnCollection, limit, start), total));
         })
         .catch((err) => {
            reject(err);
         });
      })
   }

   getValoracionesById(_valoracionId: number ): Promise<ValoracionModel> {
      return new Promise<ValoracionModel>((resolve, reject) => {
         this.localStorage.get("valoraciones")
         .then((data) => {
            let result: any = data;
            if (_valoracionId != undefined && _valoracionId != null && _valoracionId > 0) {
               result = result.filter(f => f.id = _valoracionId);
            } 
            let returnItem: ValoracionModel;
            for (let i = 0; i < result.length; ++i) {
               let item: any = result[i];
               returnItem = new ValoracionModel(
                  item["id"],
                  item["categoriaId"],
                  item["elementoId"],
                  item["valoracion"],
                  item["descripcion"],
                  item["imagen"]
               )
            }
            resolve(returnItem);
         })
         .catch((err) => {
            reject(err);
         });
      })
   }

   saveValoracion(_valoracion: ValoracionModel): Promise<ValoracionModel> {
      return new Promise<ValoracionModel>((resolve, reject) => {
         let currentData: PagingModel<ValoracionModel>;
         let id: number = 1;
         this.getValoraciones()
         .then((data) => {
            currentData = data;
            if (_valoracion.id < 0) {
                let id: number = 1;
                if (currentData != undefined && currentData != null && currentData.items.length > 0) {
                    id = currentData.items.length + 1;
                 }
                 _valoracion.id = id;
            }
            currentData.items.push(_valoracion);
            this.localStorage.set("valoraciones", currentData)
            .then((data) => {
               if (data) {
                  this.getValoracionesById(_valoracion.id)
                  .then((data) => {
                     resolve(data);
                  })
                  .catch((err) => {
                     reject(err);
                  });
               } else {
                  reject("No se ha podido guardar la valoracion.");
               }
            })
            .catch((err) => {
               reject(err);
            });
         })
         .catch((err) => {
            reject(err);
         });
      });
   }

   deleteValoracion(_valoracion: ValoracionModel): Promise<boolean> {
      return new Promise<boolean>((resolve, reject) => {
         let currentData: PagingModel<ValoracionModel>;
         this.getValoraciones()
         .then((data) => {
            currentData = data;
            for (let i = 0; i < currentData.items.length; ++i) {
               let item: ValoracionModel = currentData[i];
               if (item.id == _valoracion.id) {
                  currentData.items.splice(i, 1);
               }
            }
            this.localStorage.set("valoraciones", currentData)
            .then((data) => {
               if (data) {
                  resolve(data);
               } else {
                  reject("No se ha podido eliminar la valoración.");
               }
            })
            .catch((err) => {
               reject(err);
            });
         })
         .catch((err) => {
            reject(err);
         });
      });
   }

}