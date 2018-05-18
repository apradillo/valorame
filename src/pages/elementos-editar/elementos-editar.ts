import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UtilsService } from '../../providers/utils';
import { ElementoValoracionModel } from '../../models/elementoValoracion';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../providers/alert';
import { ApiService } from '../../providers/api';
import { ImagesService } from '../../providers/image';
import { CategoriaModel } from '../../models/categoria';

/**
 * Generated class for the ElementosEditarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-elementos-editar',
  templateUrl: 'elementos-editar.html',
})
export class ElementosEditarPage {

  elemento: ElementoValoracionModel;
  categoriasList: CategoriaModel[];
  ready: boolean;
  elementoForm: FormGroup;
  valoracionForm: FormGroup;
  submitAttempt: boolean;
  titulo: string;
  fileToUpload: File;
  bCategoriaEditable: boolean;
  @ViewChild('file') mapElement: ElementRef;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public utilService: UtilsService,
    public api: ApiService,
    public alertService: AlertService,
    public imageService: ImagesService,
    public formBuilder: FormBuilder) {

    this.ready = false;
    this.submitAttempt = false;
    this.categoriasList = [];

    this.elementoForm = formBuilder.group({
      categoriaSelect: ['', Validators.compose([Validators.required])],
      nombreElemento: ['', Validators.compose([Validators.required])]
    });

    this.valoracionForm = formBuilder.group({
      descripcionValoracion: ['', Validators.compose([Validators.required])]
    });

    this.elemento = this.navParams.get('elemento');
    this.titulo = (this.elemento.id > 0 ? this.elemento.nombreElemento : 'Nuevo elemento');
    this.bCategoriaEditable = (this.elemento.id > 0 ? false : true);
    this.fileToUpload = null;
  }

  ionViewDidLoad() {

  }

  ionViewDidEnter() {
    this.init();
  }

  init(): void {
    this.alertService.showLoading()
      .then(() => {
        this.api.getCategorias()
        .then((data) => {
          this.categoriasList = data.items;
          this.ready = true;
          this.alertService.hideLoading();
        })
        
      });
  }

  save(): void {
    this.submitAttempt = true;
    let bAlta: boolean = (this.elemento.id > 0 ? false : true);
    if (this.elementoForm.valid) {
      this.alertService.showLoading('Guardando...')
        .then(() => {
          this.api.saveElemento(this.elemento)
            .then((data) => {
              this.elemento = data;
              this.alertService.hideLoading();
              let msg: string = "";
              if (bAlta) {
                msg = "Elemento añadido.";
              } else {
                msg = "Elemento modificado.";
              }
              this.alertService.showToast(msg);
              this.navCtrl.pop();
            });
        }).catch(err => {
          this.alertService.hideLoading();
          let msg: string = "";
          if (bAlta) {
            msg = "No se ha podido añadir el elemento.";
          } else {
            msg = "No se ha podido modificar el elemento.";
          }
          this.alertService.showToast(msg + "\n" + err);
        });
    }
  }

  cancelEditing(): void {
    this.submitAttempt = false;
    this.navCtrl.pop();
  }

  subirImagen(): void {
    document.getElementById("file").click();
  }

  deleteImagen(): void {
    this.elemento.imagen = '';
  }

  selectFileToUpload(event): void {
    this.imageService.handleImageSelection(event).subscribe((res) => {
      let suffix = res.split(':')[1].split('/')[1].split(";")[0];
      if (this.imageService.isCorrectFileType(suffix)) {
        this.elemento.imagen = res;
      } else {
        this.alertService.showToast('No se puede subir el archivo. Por favor, seleccione un archivo de tipo imagen.');
      }
    }, (error) => {
      console.dir(error);
      this.alertService.showToast(error.message);
    });
  }
}
