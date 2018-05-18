import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CategoriaModel } from '../../models/categoria';
import { ApiService } from '../../providers/api';
import { UtilsService } from '../../providers/utils';
import { AlertService } from '../../providers/alert';
import { CategoriasDetallePage } from '../categorias-detalle/categorias-detalle';
import { CategoriasEditarPage } from '../categorias-editar/categorias-editar';
import { ModalService } from '../../providers/modal';

/**
 * Generated class for the CategoriasListadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-categorias-listado',
  templateUrl: 'categorias-listado.html',
})
export class CategoriasListadoPage {

  categorias: CategoriaModel[];
  start: number;
  limit: number;
  total: number;
  filtro_busqueda: string;
  searching: boolean;
  startSearching: boolean;
  ready: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiService,
    public utilService: UtilsService,
    public modalService: ModalService,
    public alertService: AlertService) {

    this.start = 0;
    this.limit = 20;
    this.total = 0;
    this.filtro_busqueda = '';
    this.categorias = [];
    this.searching = false;
    this.ready = false;

    if (this.navParams != undefined && this.navParams.data.startSearching != null) {
      this.startSearching = this.navParams.data.startSearching;
    } else {
      this.startSearching = false;
    }

  }

  ionViewDidLoad() {

  }

  ionViewDidEnter() {
    if (this.startSearching) {
      this.alertService.showLoading()
        .then(() => {
          this.getCategorias(true, false)
            .then(() => {
              this.alertService.hideLoading();
              this.ready = true;
            })
            .catch((err) => {
              this.alertService.hideLoading();
            });
        })
        .catch((err) => {
          this.alertService.hideLoading();
        });
    } else {
      this.ready = true;
    }
  }

  buscarCategorias(ev) {
    this.filtro_busqueda = ev.target.value || "";
    if (this.filtro_busqueda.length > 2) {
      this.searching = true;
      this.getCategorias(true, false);
    } else {
      this.searching = false;
    }
  }

  getCategorias(limpiarLista: boolean, showLoading: boolean, infiniteScroll?: any): Promise<any> {

    if (limpiarLista) {
      this.start = 0;
    }
    // Creamos el loader
    if (showLoading) {
      this.alertService.showLoading()
      .then(() => {
        return new Promise<any>((resolve, reject) => {
          this.api.getCategorias(this.filtro_busqueda, this.start, this.limit)
            .then(data => {
              if (limpiarLista) {
                this.categorias = [];
                this.total = 0;
              }
              this.searching = false;
              this.categorias = this.categorias.concat(data.items);
              this.total = data.total;
              if (infiniteScroll != undefined && infiniteScroll != null) {
                infiniteScroll.complete();
              }
              if (showLoading) {
                this.alertService.hideLoading();
              }
              resolve();
            }, (error) => {
              this.alertService.hideLoading();
              if (infiniteScroll != undefined && infiniteScroll != null) {
                infiniteScroll.complete();
              }
              this.alertService.showToast(error);
              reject();
            })
            .catch(err => {
              this.alertService.hideLoading();
              if (infiniteScroll != undefined && infiniteScroll != null) {
                infiniteScroll.complete();
              }
              this.alertService.showMessage('Error');
              reject();
            })
        });
      })
    } else {
      return new Promise<any>((resolve, reject) => {
        this.api.getCategorias(this.filtro_busqueda)
          .then(data => {
            if (limpiarLista) {
              this.categorias = [];
              this.total = 0;
            }
            this.searching = false;
            this.categorias = this.categorias.concat(data.items);
            this.total = data.total;
            if (infiniteScroll != undefined && infiniteScroll != null) {
              infiniteScroll.complete();
            }
            if (showLoading) {
              this.alertService.hideLoading();
            }
            resolve();
          }, (error) => {
            this.alertService.hideLoading();
            if (infiniteScroll != undefined && infiniteScroll != null) {
              infiniteScroll.complete();
            }
            this.alertService.showToast(error);
            reject();
          })
          .catch(err => {
            this.alertService.hideLoading();
            if (infiniteScroll != undefined && infiniteScroll != null) {
              infiniteScroll.complete();
            }
            this.alertService.showMessage('Error');
            reject();
          })
      });
    }    
  }

  doInfinite(infiniteScroll) {
    this.start += this.limit;
    this.getCategorias(false, false, infiniteScroll);
  }

  openCategoria(categoria: CategoriaModel) {
    this.navCtrl.push(CategoriasDetallePage, {
      categoria: categoria,
      params: {startSearching: true}
    });
  }

  addCategoria() {
    let categoria = new CategoriaModel(-1, '', 0);
    this.modalService.showModal(CategoriasEditarPage, false, [categoria], 'one-field')
      .then((saved: boolean) => {
        if (saved) {
          this.getCategorias(true, true);
        }
      });
  }

  confirmDeleteCategoria(categoria: CategoriaModel) {
    this.alertService.showConfirm('¿Desea eliminar esta categoría?', 'Eliminar categoría')
      .then(data => {
        if (data == 'yes') {
          this.deleteCategoria(categoria);
        }
      });
  }

  deleteCategoria(categoria: CategoriaModel) {
    this.api.deleteCategoria(categoria)
      .then((data) => {
        this.alertService.showToast('Categoría eliminada correctamente');
        this.getCategorias(true, true);
      }, (error) => {
        this.alertService.showToast(error);
      })
      .catch(err => {
        this.alertService.showMessage('Error');
      })
  }

}
