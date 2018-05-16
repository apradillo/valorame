import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Platform } from "ionic-angular";

@Injectable()
export class UtilsService {

  username: string;
  devicePushId: string;

  //region Constructor
  constructor(private platform: Platform) {
    this.username = null;
    this.devicePushId = null;
  }

  noAccents(source) {
    var accent = [
      /[\300-\306]/g, /[\340-\346]/g, // A, a
      /[\310-\313]/g, /[\350-\353]/g, // E, e
      /[\314-\317]/g, /[\354-\357]/g, // I, i
      /[\322-\330]/g, /[\362-\370]/g, // O, o
      /[\331-\334]/g, /[\371-\374]/g, // U, u
      /[\321]/g, /[\361]/g, // N, n
      /[\307]/g, /[\347]/g, // C, c
    ],
      noaccent = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'N', 'n', 'C', 'c'];

    for (var i = 0; i < accent.length; i++) {
      source = source.replace(accent[i], noaccent[i]);
    }

    return source;
  };

  getTodayString() {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var ddString, mmString: string;

    var yyyy = today.getFullYear();
    if (dd < 10) {
      ddString = '0' + dd;
    }
    if (mm < 10) {
      mmString = '0' + mm;
    }

    return ddString + '/' + mmString + '/' + yyyy;

  };

  getDateString(fechaPasada: string): string {

    let fecha = new Date(fechaPasada.replace(' ', 'T'));

    let dd: number = fecha.getDate();
    let mm: number = fecha.getMonth() + 1; //January is 0!

    let ddString, mmString: string;

    ddString = dd.toString();
    mmString = mm.toString();

    let yyyy = fecha.getFullYear();
    if (dd < 10) {
      ddString = '0' + dd;
    }
    if (mm < 10) {
      mmString = '0' + mm;
    }

    return ddString + '/' + mmString + '/' + yyyy;

  }

  getDateMesString(fechaPasada: string): string {

    let fecha = new Date(fechaPasada.replace(' ', 'T'));

    let dd: number = fecha.getDate();
    let mm: number = fecha.getMonth(); //January is 0!

    let monthNames = ["ene", "feb", "mar", "abr", "may", "jun",
      "jul", "ago", "sep", "oct", "nov", "dic"
    ];

    let ddString, mmString: string;

    ddString = dd.toString();
    mmString = monthNames[mm];

    let yyyy = fecha.getFullYear();
    if (dd < 10) {
      ddString = '0' + dd;
    }



    return ddString + '/' + mmString + '/' + yyyy;

  }

  formatDate(date): string {

    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  formatTelephone(telefono): string {
    return telefono.replace(/(\d\d\d)(\d\d\d)(\d\d\d)/, "$1 $2 $3")
  }

  isValidEmail(email: string): boolean {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    if (email != undefined && email != null && email != "" && (email.length <= 5 || !EMAIL_REGEXP.test(email))) {
      return false;
    }
    return true;
  }

  public isChecked(control: FormControl) {

    if (control.value != undefined && control.value != null && control.value != true) {
      return { "No está marcado": true };
    }

    return null;

  }

  getTotalMinutosByString(valorHora : string): number {
    let totalMinutos: number = 0;
    if (valorHora.indexOf(':') > 0) {
      let arrHora: string[] = valorHora.split(":");
      if (arrHora.length = 2) {
        if (arrHora[0] != undefined && arrHora[0] != null) {
          totalMinutos += parseInt(arrHora[0], 10) * 60;
        }
        if (arrHora[1] != undefined && arrHora[1] != null) {
          totalMinutos += parseInt(arrHora[1], 10);
        }
      }
    }
    return totalMinutos;
  }

  formatNumber(nStr) {
    let sep = '.';
    nStr += '';
    let x = nStr.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? ',' + x[1] : '';
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + sep + '$2');
    }
    return x1 + x2;
  }

  openExternal(url) {
    window.open(url, "_system");
    return false;
  }

  isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  paginate (array: any, limit: number, start: number) {
    return array.slice(start, (start + limit));
  }

  getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

  //region Firebase
  // firebaseHasPermission(): Promise<any> {

  //   return new Promise<any>((resolve, reject) => {

  //     if (this.platform.is('core')) {
  //       resolve();
  //     } else {
  //       this.firebase.hasPermission().then((data) => {
  //         resolve(data);
  //       }, (err) => {
  //         reject(err);
  //       });
  //     }

  //   });

  // }

  // firebaseGrantPermission(): Promise<any> {

  //   return new Promise<any>((resolve, reject) => {

  //     if (this.platform.is('core')) {
  //       resolve();
  //     } else {
  //       this.firebase.grantPermission().then((data) => {
  //         resolve(data);
  //       }, (err) => {
  //         reject(err);
  //       });
  //     }

  //   });

  // }

  // firebaseGetToken(): Promise<any> {

  //   return new Promise<any>((resolve, reject) => {

  //     if (this.platform.is('core')) {
  //       resolve();
  //     } else {
  //       this.firebase.getToken().then((data) => {
  //         resolve(data);
  //       }, (err) => {
  //         reject(err);
  //       });
  //     }

  //   });

  // }

  // firebaseEvent(evento: string, obj: any): Promise<any> {

  //   return new Promise<any>((resolve, reject) => {

  //     if (this.platform.is('core')) {
  //       resolve();
  //     } else {
  //       this.firebase.logEvent(evento, obj).then((data) => {
  //         resolve(data);
  //       }, (err) => {
  //         reject(err);
  //       });
  //     }

  //   });

  // }
  //endregion

}

