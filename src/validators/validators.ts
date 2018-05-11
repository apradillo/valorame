/**
 * Created by alberto on 06/04/2017.
 */
import {FormControl} from '@angular/forms';

export class CustomValidators {

  static isValidDniCif(control: FormControl): any {
    let validDNI: boolean = false;
    let validCIF: boolean = false;

    if (control != undefined && control != null && control.value != undefined && control.value != null && control.value != "") {
      // validDNI = CustomValidators.checkDNINIE(control.value);
      // validCIF = CustomValidators.checkCIF(control.value);
      validDNI = CustomValidators.checkDNINIE(control.value.trim().replace(' ', '').replace('-', ''));
      validCIF = CustomValidators.checkCIF(control.value.trim().replace(' ', '').replace('-', ''));
    } else {
      //si esta vacio se ponen los flags a true porque la obligatoriedad se controla con otro validator.
      validDNI = true;
      validCIF = true;
    }

    if (!validDNI && !validCIF) {
      return {
        "No es DNI/CIF válido": true
      };
    }

    return null;
  }

  static isValidEmail(control: FormControl) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if (control.value != undefined && control.value != null && control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
      return {"No es email válido": true};
    }

    return null;
  }

  static isMayor0(control: FormControl): any {
    if (control != undefined && control != null && control.value != undefined && control.value != null && control.value != "") {
      if (!(isNaN(control.value))) {
        let num: number = parseInt(control.value);
        if (num > 0) {
          return null;
        } else {
          return {"No es valor válido": true};
        }
      }
    } else {
      return {"No es valor válido": true};
    }
  }

  //region FUNCTIONS
  /*  private static checkDNINIE(dninie: string): boolean {
   let LetrasDNI = 'TRWAGMYFPDXBNJZSQVHLCKE';

   let regexNIE = /^[xyzXYZ]\d{7}[a-zA-Z]$/
   let regexDNI = /^\d{8}[a-zA-Z]$/
   if (regexDNI.test(dninie)) {
   let numDNI: number = parseInt(dninie.substr(0, 8), 10);
   let letra = LetrasDNI[numDNI % 23];
   if (numDNI + letra == dninie.toUpperCase()) {
   return true;
   } else {
   return false;
   }
   } else if (regexNIE.test(dninie)) {
   let sustitucionPrimeraLetra = '';
   switch (dninie.substr(0, 1).toUpperCase()) {
   case 'X':
   sustitucionPrimeraLetra = '0';
   break;
   case 'Y':
   sustitucionPrimeraLetra = '1';
   break;
   case 'Z':
   sustitucionPrimeraLetra = '2';
   break;
   }
   let numDNI: number = parseInt(sustitucionPrimeraLetra, 10) + parseInt(dninie.substr(1, 7), 10);
   let letra = LetrasDNI[numDNI % 23];
   if (letra == dninie.substr(8, 1).toUpperCase()) {
   return true;
   } else {
   return false;
   }
   } else {
   return false;
   }
   }*/

  private static checkDNINIE(dninie: string): boolean {

    var validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
    var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
    var nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
    var str = dninie.toUpperCase();

    if (!nifRexp.test(str) && !nieRexp.test(str)) return false;

    var nie = str
      .replace(/^[X]/, '0')
      .replace(/^[Y]/, '1')
      .replace(/^[Z]/, '2');

    var letter = str.substr(-1);
    var charIndex = parseInt(nie.substr(0, 8)) % 23;

    if (validChars.charAt(charIndex) === letter) return true;

    return false;
  }

  private static  checkCIF(cif: string): boolean {
    cif = cif.toUpperCase();
    let regexCIF = /^([ABCDEFGHJNUVW]\d{8}|[NPQRSW]\d{7}[A-Z])$/;

    if (regexCIF.test(cif)) {

      // Calculamos el dígito de control
      let equivLetras = 'JABCDEFGHI';

      // Obtenemos el número de CIF
      let num = cif.substr(1, 7);

      // Sumamos las posiciones pares.
      let sum1 = parseInt(num[1], 10) + parseInt(num[3], 10) + parseInt(num[5], 10);

      // Multiplicamos por 2 las posiciones impares y sumamos sus cifras, a continuación las acumulamos
      let sum2_1 = parseInt(num[0], 10) * 2;
      let sum2_2 = parseInt(num[2], 10) * 2;
      let sum2_3 = parseInt(num[4], 10) * 2;
      let sum2_4 = parseInt(num[6], 10) * 2;
      if (sum2_1 > 9) {
        sum2_1 = parseInt(sum2_1.toString()[0], 10) + parseInt(sum2_1.toString()[1], 10);
      }
      if (sum2_2 > 9) {
        sum2_2 = parseInt(sum2_2.toString()[0], 10) + parseInt(sum2_2.toString()[1], 10);
      }
      if (sum2_3 > 9) {
        sum2_3 = parseInt(sum2_3.toString()[0], 10) + parseInt(sum2_3.toString()[1], 10);
      }
      if (sum2_4 > 9) {
        sum2_4 = parseInt(sum2_4.toString()[0], 10) + parseInt(sum2_4.toString()[1], 10);
      }

      let sum2 = sum2_1 + sum2_2 + sum2_3 + sum2_4;

      let sum = sum1 + sum2;
      let digito = sum % 10;
      let DC = (10 - digito) % 10;

      if (cif.substr(8, 1) == DC.toString() || cif.substr(8, 1) == equivLetras[DC]) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  //endregion

}
