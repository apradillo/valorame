import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CategoriasListadoPage } from '../categorias-listado/categorias-listado';
import { AlertService } from '../../providers/alert';
import { ElementosListadoPage } from '../elementos-listado/elementos-listado';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  activeCategorias: boolean;
  activeElementos: boolean;
  activeRanking: boolean;

  visibleCategorias: boolean;
  visibleElementos: boolean;
  visibleRanking: boolean;

  constructor(public navCtrl: NavController,
    public alertService: AlertService) {
    this.activeCategorias = true;
    this.activeElementos = true;
    this.activeRanking = false;

    this.visibleCategorias = true;
    this.visibleElementos = true;
    this.visibleRanking = false;

  }

  openCategorias() {
    if (this.visibleCategorias) {
      if (this.activeCategorias) {
        this.navCtrl.setRoot(CategoriasListadoPage, { startSearching: true });
      } else {
        this.alertService.showToast('Próximamente');
      }
    }
  }

  openElementos() {
    if (this.visibleElementos) {
      if (this.activeElementos) {
        this.navCtrl.setRoot(ElementosListadoPage, { startSearching: true });
      } else {
        this.alertService.showToast('Próximamente');
      }
    }
  }

  openRanking() {
    if (this.visibleRanking) {
      if (this.activeRanking) {
        //this.navCtrl.setRoot(ElementosListadoPage, { startSearching: true });
        this.alertService.showToast('Próximamente');
      } else {
        this.alertService.showToast('Próximamente');
      }
    }
  }

}
