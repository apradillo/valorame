import { Injectable } from "@angular/core";
import { ModalController, PopoverController } from "ionic-angular";

@Injectable()
export class ModalService {

  //region Constructor
  constructor(public modalCtrl: ModalController,
    public popoverCtrl: PopoverController) {
  }

  //region Modal
  showModal(page: any, enableBackdropDismiss: boolean, params?: any[], cssClasses?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let modal = this.modalCtrl.create(
        page,
        { params },
        {
          enableBackdropDismiss: enableBackdropDismiss,
          cssClass: (cssClasses != undefined && cssClasses != null ? cssClasses : '')
        });
      modal.onDidDismiss(data => {
        resolve(data);
      });
      modal.present();
    });
  }

  //endregion

  //region Popover
  showPopover(page: any, event: any, enableBackdropDismiss: boolean, params?: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      let popover = this.popoverCtrl.create(page, { params }, { enableBackdropDismiss: enableBackdropDismiss });
      popover.onDidDismiss(data => {
        resolve(data);
      });
      popover.present({
        ev: event
      });
    });
  }

  //endregion


}
