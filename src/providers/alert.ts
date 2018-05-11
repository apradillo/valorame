
import { Injectable } from "@angular/core";
import { ToastController, LoadingController, Loading, AlertController } from "ionic-angular";

@Injectable()
export class AlertService {
  loader: Loading;

  //region Constructor
  constructor(public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
  }

  //endregion

  //region Alert
  showMessage(msg: string, _title?: string, textoOK?: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.hideLoading()
        .then(() => {
          let title: string = "";
          if (_title != undefined && _title != null && _title.length > 0) {
            title = _title;
          }
          let strOK: string = 'Ok';
          if (textoOK != undefined && textoOK != null && textoOK.length > 0) {
            strOK = textoOK;
          }

          let alerta = this.alertCtrl.create({
            enableBackdropDismiss: false,
            title: title,
            subTitle: msg,
            buttons: [{
              text: strOK,
              role: 'cancel',
              handler: () => {
                setTimeout(() => {
                  resolve('cancel');
                }, 0);
              }
            }]
          });
          alerta.present();
        });
    });
  }

  showConfirm(msg: string, _title?: string, textoOK?: string, textoCanel?: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.hideLoading()
        .then(() => {
          let title: string = "";
          if (_title != undefined && _title != null && _title.length > 0) {
            title = _title;
          }
          let strOK: string = 'Sí';
          if (textoOK != undefined && textoOK != null && textoOK.length > 0) {
            strOK = textoOK;
          }
          let strCancel: string = 'No';
          if (textoCanel != undefined && textoCanel != null && textoCanel.length > 0) {
            strCancel = textoCanel;
          }
          let alerta = this.alertCtrl.create({
            enableBackdropDismiss: false,
            title: title,
            subTitle: msg,
            buttons: [
              {
                text: strCancel,
                role: 'cancel',
                handler: () => {
                  setTimeout(() => {

                    resolve('no');
                  }, 0);
                }
              },
              {
                text: strOK,
                handler: () => {
                  setTimeout(() => {

                    resolve('yes');
                  }, 0);
                }
              }
            ]
          });
          alerta.present();
        });

    });
  }

  showPromptInput1(msg: string, _title?: string, textoOK?: string, textoCanel?: string, inputPlaceholder?: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {

      this.hideLoading()
        .then(() => {
          let title: string = "";
          if (_title != undefined && _title != null && _title.length > 0) {
            title = _title;
          }
          let strOK: string = 'Sí';
          if (textoOK != undefined && textoOK != null && textoOK.length > 0) {
            strOK = textoOK;
          }
          let strCancel: string = 'No';
          if (textoCanel != undefined && textoCanel != null && textoCanel.length > 0) {
            strCancel = textoCanel;
          }
          let strInputPlaceholder: string = '';
          if (inputPlaceholder != undefined && inputPlaceholder != null && inputPlaceholder.length > 0) {
            strInputPlaceholder = inputPlaceholder;
          }

          let alerta = this.alertCtrl.create({
            enableBackdropDismiss: false,
            title: title,
            subTitle: msg,
            inputs: [
              {
                name: 'input1',
                placeholder: strInputPlaceholder
              }
            ],
            buttons: [
              {
                text: strCancel,
                role: 'cancel',
                handler: () => {
                  setTimeout(() => {
                    resolve(false);
                  }, 0);
                }
              },
              {
                text: strOK,
                handler: data => {
                  setTimeout(() => {
                    resolve(data.input1);
                  }, 0);
                }
              }
              ]
          });
          alerta.present();
        });
    });

  }

  showPromptInput2(msg: string, _title?: string, textoOK?: string, textoCanel?: string, input1Placeholder?: string, input2Placeholder?: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.hideLoading()
        .then(() => {
          let title: string = "";
          if (_title != undefined && _title != null && _title.length > 0) {
            title = _title;
          }
          let strOK: string = 'Sí';
          if (textoOK != undefined && textoOK != null && textoOK.length > 0) {
            strOK = textoOK;
          }
          let strCancel: string = 'No';
          if (textoCanel != undefined && textoCanel != null && textoCanel.length > 0) {
            strCancel = textoCanel;
          }
          let strInput1Placeholder: string = '';
          if (input1Placeholder != undefined && input1Placeholder != null && input1Placeholder.length > 0) {
            strInput1Placeholder = input1Placeholder;
          }
          let strInput2Placeholder: string = '';
          if (input2Placeholder != undefined && input2Placeholder != null && input2Placeholder.length > 0) {
            strInput2Placeholder = input2Placeholder;
          }

          let alerta = this.alertCtrl.create({
            enableBackdropDismiss: false,
            title: title,
            subTitle: msg,
            inputs: [
              {
                name: 'input1',
                placeholder: strInput1Placeholder
              },
              {
                name: 'input2',
                placeholder: strInput2Placeholder
              }
            ],
            buttons: [
              {
                text: strCancel,
                role: 'cancel',
                handler: () => {
                  setTimeout(() => {
                    resolve(false);
                  }, 0);
                }
              },
              {
                text: strOK,
                handler: data => {
                  setTimeout(() => {
                    resolve([data.input1, data.input2]);
                  }, 0);
                }
              }]
          });
          alerta.present();
        });
    });

  }

  //endregion

  //region Loading
  showLoading(msg?: string, _spinner?: string): Promise<any> {
    //var me = this;
    return new Promise<any>((resolve, reject) => {
      this.hideLoading()
        .then(() => {
          let content: string = "Cargando...";
          if (msg != undefined && msg != null && msg.length > 0) {
            content = msg;
          }
          let spinner: string = "bubbles";
          if (_spinner != undefined && _spinner != null && _spinner.length > 0) {
            spinner = _spinner;
          }

          this.loader = this.loadingCtrl.create({
            spinner: spinner,
            content: content
          });
          this.loader.present();
          setTimeout(() => {
            resolve();
          }, 0);
        });
    });
  }

  hideLoading(): Promise<any> {

    return new Promise<any>((resolve, reject) => {
      if (this.loader != undefined && this.loader != null) {
        this.loader.dismissAll();
        this.loader = null;
      }
      setTimeout(() => {
        resolve();
      }, 1);
    });
  }

  //endregion

  //region Toast
  showToast(message: string, _duration?: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.hideLoading()
        .then(() => {
          let duration: number = 3000;
          if (_duration != undefined && _duration != null && _duration > 0) {
            duration = _duration;
          }
          let toast = this.toastCtrl.create({
            message: message,
            duration: duration,
            position: 'top'
          });
          toast.present();
          setTimeout(() => {
            resolve(); //resolvemos cuando se olculta el toast
          }, duration + 500);
        });
    });
  }

  //endregion

}
