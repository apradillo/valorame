import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { CategoriaModel } from '../../models/categoria';
import { ApiService } from '../../providers/api';
import { AlertService } from '../../providers/alert';
import { ModalService } from '../../providers/modal';

/**
 * Generated class for the CategoriasEditarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-categorias-editar',
  templateUrl: 'categorias-editar.html',
})
export class CategoriasEditarPage {

  categoria: CategoriaModel;
  ready: boolean;
  categoriaForm: FormGroup;
  submitAttempt: boolean;
  titulo: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalService: ModalService,
    public api: ApiService,
    public alertService: AlertService,
    public formBuilder: FormBuilder) {

    this.ready = false;
    this.submitAttempt = false;
    this.categoriaForm = formBuilder.group({
      nombreCategoria: ['', Validators.compose([Validators.required])]
    });

    this.categoria = this.navParams.data.params[0];
    this.titulo = (this.categoria.id > 0 ? 'Editar categoría' : 'Nueva categoría');
  }

  ionViewDidLoad() {

  }

  ionViewDidEnter() {
    this.init();
  }

  init() {
    this.alertService.showLoading()
      .then(() => {
        this.ready = true;
        this.alertService.hideLoading();
      });
  }

  save() {
    this.submitAttempt = true;
    let bAlta: boolean = (this.categoria.id > 0 ? false : true);
    if (this.categoriaForm.valid) {
      this.alertService.showLoading('Guardando...')
        .then(() => {
          this.api.saveCategoria(this.categoria)
            .then((data) => {
              this.categoria = data;
              this.alertService.hideLoading();
              let msg: string = "";
              if (bAlta) {
                msg = "Categoría añadida.";
              } else {
                msg = "Categoría modificada.";
              }
              this.alertService.showToast(msg);
              if (this.viewCtrl != undefined) {
                this.viewCtrl.dismiss(true);
              } 
              });
            }).catch(err => {
              this.alertService.hideLoading();
              let msg: string = "";
              if (bAlta) {
                msg = "No se ha podido añadir la categoría.";
              } else {
                msg = "No se ha podido modificar la categoría.";
              }
              this.alertService.showToast(msg + "\n" + err);
            });
        }
    }

  cancelEditing() {
    this.submitAttempt = false;
    return new Promise((resolve, reject) => {
      if (this.viewCtrl != undefined) {
        this.viewCtrl.dismiss()
          .then(() => {
            resolve(false);
          });
      }
    });
  }

}
