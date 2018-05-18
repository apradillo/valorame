import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ElementoValoracionModel } from '../../models/elementoValoracion';
import { ApiService } from '../../providers/api';
import { UtilsService } from '../../providers/utils';
import { AlertService } from '../../providers/alert';
import { ElementosEditarPage } from '../elementos-editar/elementos-editar';
import { ModalService } from '../../providers/modal';

/**
 * Generated class for the ElementosListadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-elementos-listado',
  templateUrl: 'elementos-listado.html',
})
export class ElementosListadoPage {

  elementos: ElementoValoracionModel[];
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
    this.elementos = [];
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
          this.getElementos(true, false)
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

  buscarElementos(ev) {
    this.filtro_busqueda = ev.target.value || "";
    if (this.filtro_busqueda.length > 2) {
      this.searching = true;
      this.getElementos(true, false);
    } else {
      this.searching = false;
    }
  }

  getElementos(limpiarLista: boolean, showLoading: boolean, infiniteScroll?: any): Promise<any> {

    if (limpiarLista) {
      this.start = 0;
    }
    // Creamos el loader
    if (showLoading) {
      this.alertService.showLoading()
      .then(() => {
        return new Promise<any>((resolve, reject) => {
          this.api.getElementos(-1, this.filtro_busqueda, this.start, this.limit)
            .then(data => {
              if (limpiarLista) {
                this.elementos = [];
                this.total = 0;
              }
              this.searching = false;
              this.elementos = this.elementos.concat(data.items);
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
        this.api.getElementos(-1, this.filtro_busqueda, this.start, this.limit)
          .then(data => {
            if (limpiarLista) {
              this.elementos = [];
              this.total = 0;
            }
            this.searching = false;
            this.elementos = this.elementos.concat(data.items);
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
    this.getElementos(false, false, infiniteScroll);
  }

  openElemento(elemento: ElementoValoracionModel) {
    this.navCtrl.push(ElementosEditarPage, {
      elemento: elemento
    });
  }

  addElemento() {
    let elemento = new ElementoValoracionModel(-1, -1, '', '', 0, '');
    this.navCtrl.push(ElementosEditarPage, {
      elemento: elemento
    });
  }

  confirmDeleteElemento(elemento: ElementoValoracionModel) {
    this.alertService.showConfirm('¿Desea eliminar este elemento?', 'Eliminar elemento')
      .then(data => {
        if (data == 'yes') {
          this.deleteElemento(elemento);
        }
      });
  }

  deleteElemento(elemento: ElementoValoracionModel) {
    this.api.deleteElemento(elemento)
      .then((data) => {
        this.alertService.showToast('Elemento eliminado correctamente');
        this.getElementos(true, true);
      }, (error) => {
        this.alertService.showToast(error);
      })
      .catch(err => {
        this.alertService.showMessage('Error');
      })
  }

}
