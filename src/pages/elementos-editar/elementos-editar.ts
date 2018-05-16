import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UtilsService } from '../../providers/utils';
import { ElementoModel } from '../../models/elemento';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../providers/alert';
import { ApiService } from '../../providers/api';
import { ImagesService } from '../../providers/image';

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

  elemento: ElementoModel;
  ready: boolean;
  elementoForm: FormGroup;
  submitAttempt: boolean;
  titulo: string;
  fileToUpload: File;
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

    this.elementoForm = formBuilder.group({
      nombreElemento: ['', Validators.compose([Validators.required])]
    });

    this.elemento = this.navParams.get('elemento');
    this.titulo = (this.elemento.id > 0 ? 'Editar elemento' : 'Nuevo elemento');
    this.fileToUpload = null;
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
    let bAlta: boolean = (this.elemento.id > 0 ? false : true);
    if (this.elementoForm.valid) {
      this.alertService.showLoading('Guardando...')
        .then(() => {
          debugger;
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

  cancelEditing() {
    this.submitAttempt = false;
    this.navCtrl.pop();
  }

  subirImagen() {
    document.getElementById("file").click();
  }

  deleteImagen() {
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
