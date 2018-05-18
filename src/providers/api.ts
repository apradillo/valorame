import { Injectable } from "@angular/core";

import { LocalStorageService } from "../providers/localStorage";

import { PagingModel } from "../models/paging";
import { LoginModel } from './../models/login';
import { ComboModel } from "../models/combo";
import { CategoriaModel } from "../models/categoria";
//import { ElementoModel } from "../models/elemento";
//import { ValoracionModel } from "../models/valoracion";
import { ElementoValoracionModel } from "../models/elementoValoracion";
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
            this.localStorage.get("valorame_categorias")
                .then((data) => {
                    let result: any = data;
                    this.getElementos()
                        .then((data) => {
                            let listaElementos: ElementoValoracionModel[] = data.items;
                            if (_busqueda != undefined && _busqueda != null && _busqueda.trim().length > 0) {
                                result = result.filter(f => f.nombreCategoria.indexOf(_busqueda) > -1);
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
                                let item = result[i];
                                returnCollection.push(new CategoriaModel(
                                    item["id"],
                                    item["nombreCategoria"],
                                    listaElementos.filter(f => f.categoriaId == item.id).length
                                ));
                            }
                            resolve(new PagingModel<CategoriaModel>(this.utilService.paginate(returnCollection, limit, start), total));
                        });
                })
                .catch((err) => {
                    reject(err);
                });
        })
    }

    getCategoriaById(_categoriaId: number): Promise<CategoriaModel> {
        return new Promise<CategoriaModel>((resolve, reject) => {
            this.localStorage.get("valorame_categorias")
                .then((data) => {
                    let result: any = data;
                    if (_categoriaId != undefined && _categoriaId != null && _categoriaId > 0) {
                        result = result.filter(f => f.id == _categoriaId);
                    }
                    let returnItem: CategoriaModel;
                    for (let i = 0; i < result.length; ++i) {
                        let item: any = result[i];
                        let numElementos: number = 0;
                        this.getElementos(item.id)
                            .then((data) => {
                                numElementos = data.items.length;
                                returnItem = new CategoriaModel(
                                    item["id"],
                                    item["nombreCategoria"],
                                    numElementos
                                );
                            });
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
                    this.localStorage.set("valorame_categorias", currentData.items)
                        .then((data) => {
                            if (data) {
                                this.getCategoriaById(_categoria.id)
                                    .then((data) => {
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
                    currentData = data;
                    for (let i = 0; i < currentData.items.length; ++i) {
                        let item: CategoriaModel = currentData.items[i];
                        if (item.id == _categoria.id) {
                            currentData.items.splice(i, 1);
                        }
                    }
                    this.localStorage.set("valorame_categorias", currentData.items)
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

    getElementos(_categoriaId?: number, _busqueda?: string, start?: number, limit?: number): Promise<PagingModel<ElementoValoracionModel>> {
        return new Promise<PagingModel<ElementoValoracionModel>>((resolve, reject) => {
            this.localStorage.get("valorame_elementos")
                .then((data) => {
                    let result: any = data;
                    if (_categoriaId != undefined && _categoriaId != null && _categoriaId > 0) {
                        result = result.filter(f => f.categoriaId == _categoriaId);
                    }
                    if (_busqueda != undefined && _busqueda != null && _busqueda.trim().length > 0) {
                        result = result.filter(f => f.nombreCategoria.indexOf(_busqueda) > -1);
                    }
                    let total = result.length;
                    if (start == undefined || start == null) {
                        start = 0;
                    }
                    if (limit == undefined || limit == null) {
                        limit = total;
                    }
                    let returnCollection: ElementoValoracionModel[] = new Array();
                    for (let i = 0; i < result.length; ++i) {
                        let item: any = result[i];
                        returnCollection.push(new ElementoValoracionModel(
                            item["id"],
                            item["categoriaId"],
                            item["nombreElemento"],
                            item["imagen"],
                            item["valoracion"],
                            item["descripcion"]
                        ));
                    }
                    resolve(new PagingModel<ElementoValoracionModel>(this.utilService.paginate(returnCollection, limit, start), total));
                })
                .catch((err) => {
                    reject(err);
                });
        })
    }

    getElementoById(_elementoId: number): Promise<ElementoValoracionModel> {
        return new Promise<ElementoValoracionModel>((resolve, reject) => {
            this.localStorage.get("valorame_elementos")
                .then((data) => {
                    let result: any = data;

                    if (_elementoId != undefined && _elementoId != null && _elementoId > 0) {
                        result = result.filter(f => f.id == _elementoId);
                    }
                    let returnItem: ElementoValoracionModel;
                    for (let i = 0; i < result.length; ++i) {
                        let item: any = result[i];
                        returnItem = new ElementoValoracionModel(
                            item["id"],
                            item["categoriaId"],
                            item["nombreElemento"],
                            item["imagen"],
                            item["valoracion"],
                            item["descripcion"]
                        )
                    }
                    resolve(returnItem);
                })
                .catch((err) => {
                    reject(err);
                });
        })
    }

    saveElemento(_elemento: ElementoValoracionModel): Promise<ElementoValoracionModel> {
        return new Promise<ElementoValoracionModel>((resolve, reject) => {
            let currentData: PagingModel<ElementoValoracionModel>;
            let id: number = 1;
            this.getElementos()
                .then((data) => {
                    let bAlta: boolean = false;
                    currentData = data;
                    if (_elemento.id < 0) {
                        let id: number = 1;
                        if (currentData != undefined && currentData != null && currentData.items.length > 0) {
                            id = currentData.items.length + 1;
                        }
                        _elemento.id = id;
                        bAlta = true;
                    }
                    if (bAlta) {
                        currentData.items.push(_elemento);
                    } else {
                        let el: ElementoValoracionModel = currentData.items.filter(f => f.id == _elemento.id)[0];
                        el.nombreElemento = _elemento.nombreElemento;
                        el.imagen = _elemento.imagen;
                        el.valoracion = _elemento.valoracion;
                        el.descripcion = _elemento.descripcion;
                        // for (let i = 0; i < currentData.items.length; ++i) {
                        //     let item: ElementoValoracionModel = currentData[i];
                        //     if (item.id == _elemento.id) {
                        //         item.nombreElemento = _elemento.nombreElemento;
                        //         item.imagen = _elemento.imagen;
                        //         item.valoracion = _elemento.valoracion;
                        //         item.descripcion = _elemento.descripcion;
                        //     }
                        // }
                    }
                    this.localStorage.set("valorame_elementos", currentData.items)
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

    deleteElemento(_elemento: ElementoValoracionModel): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            let currentData: PagingModel<ElementoValoracionModel>;
            this.getElementos()
                .then((data) => {
                    currentData = data;
                    for (let i = 0; i < currentData.items.length; ++i) {
                        let item: ElementoValoracionModel = currentData.items[i];
                        if (item.id == _elemento.id) {
                            currentData.items.splice(i, 1);
                        }
                    }
                    this.localStorage.set("valorame_elementos", currentData.items)
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

    // getValoraciones(_categoriaId?: number, _elementoId?: number, start?: number, limit?: number): Promise<PagingModel<ValoracionModel>> {
    //     return new Promise<PagingModel<ValoracionModel>>((resolve, reject) => {
    //         this.localStorage.get("valorame_valoraciones")
    //             .then((data) => {
    //                 let result: any = data;
    //                 if (_categoriaId != undefined && _categoriaId != null && _categoriaId > 0) {
    //                     result = result.filter(f => f.categoriaId == _categoriaId);
    //                 }
    //                 if (_elementoId != undefined && _elementoId != null && _elementoId > 0) {
    //                     result = result.filter(f => f.elementoId == _elementoId);
    //                 }
    //                 let total = result.length;
    //                 if (start == undefined || start == null) {
    //                     start = 0;
    //                 }
    //                 if (limit == undefined || limit == null) {
    //                     limit = total;
    //                 }
    //                 let returnCollection: ValoracionModel[] = new Array();
    //                 for (let i = 0; i < result.length; ++i) {
    //                     let item: any = result[i];
    //                     returnCollection.push(new ValoracionModel(
    //                         item["id"],
    //                         item["categoriaId"],
    //                         item["elementoId"],
    //                         item["valoracion"],
    //                         item["descripcion"],
    //                         item["imagen"]
    //                     ))
    //                 }
    //                 resolve(new PagingModel<ValoracionModel>(this.utilService.paginate(returnCollection, limit, start), total));
    //             })
    //             .catch((err) => {
    //                 reject(err);
    //             });
    //     })
    // }

    // getValoracionesById(_valoracionId: number): Promise<ValoracionModel> {
    //     return new Promise<ValoracionModel>((resolve, reject) => {
    //         this.localStorage.get("valorame_valoraciones")
    //             .then((data) => {
    //                 let result: any = data;
    //                 if (_valoracionId != undefined && _valoracionId != null && _valoracionId > 0) {
    //                     result = result.filter(f => f.id == _valoracionId);
    //                 }
    //                 let returnItem: ValoracionModel;
    //                 for (let i = 0; i < result.length; ++i) {
    //                     let item: any = result[i];
    //                     returnItem = new ValoracionModel(
    //                         item["id"],
    //                         item["categoriaId"],
    //                         item["elementoId"],
    //                         item["valoracion"],
    //                         item["descripcion"],
    //                         item["imagen"]
    //                     )
    //                 }
    //                 resolve(returnItem);
    //             })
    //             .catch((err) => {
    //                 reject(err);
    //             });
    //     })
    // }

    // saveValoracion(_valoracion: ValoracionModel): Promise<ValoracionModel> {
    //     return new Promise<ValoracionModel>((resolve, reject) => {
    //         let currentData: PagingModel<ValoracionModel>;
    //         let id: number = 1;
    //         this.getValoraciones()
    //             .then((data) => {
    //                 currentData = data;
    //                 if (_valoracion.id < 0) {
    //                     let id: number = 1;
    //                     if (currentData != undefined && currentData != null && currentData.items.length > 0) {
    //                         id = currentData.items.length + 1;
    //                     }
    //                     _valoracion.id = id;
    //                 }
    //                 currentData.items.push(_valoracion);
    //                 this.localStorage.set("valorame_valoraciones", currentData.items)
    //                     .then((data) => {
    //                         if (data) {
    //                             this.getValoracionesById(_valoracion.id)
    //                                 .then((data) => {
    //                                     resolve(data);
    //                                 })
    //                                 .catch((err) => {
    //                                     reject(err);
    //                                 });
    //                         } else {
    //                             reject("No se ha podido guardar la valoracion.");
    //                         }
    //                     })
    //                     .catch((err) => {
    //                         reject(err);
    //                     });
    //             })
    //             .catch((err) => {
    //                 reject(err);
    //             });
    //     });
    // }

    // deleteValoracion(_valoracion: ValoracionModel): Promise<boolean> {
    //     return new Promise<boolean>((resolve, reject) => {
    //         let currentData: PagingModel<ValoracionModel>;
    //         this.getValoraciones()
    //             .then((data) => {
    //                 currentData = data;
    //                 for (let i = 0; i < currentData.items.length; ++i) {
    //                     let item: ValoracionModel = currentData[i];
    //                     if (item.id == _valoracion.id) {
    //                         currentData.items.splice(i, 1);
    //                     }
    //                 }
    //                 this.localStorage.set("valorame_valoraciones", currentData.items)
    //                     .then((data) => {
    //                         if (data) {
    //                             resolve(data);
    //                         } else {
    //                             reject("No se ha podido eliminar la valoración.");
    //                         }
    //                     })
    //                     .catch((err) => {
    //                         reject(err);
    //                     });
    //             })
    //             .catch((err) => {
    //                 reject(err);
    //             });
    //     });
    // }

}