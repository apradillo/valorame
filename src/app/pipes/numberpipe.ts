import {PipeTransform, Pipe} from "@angular/core";

@Pipe({
  name: "puntosmiles"
})
export class PuntosMilesPipe implements PipeTransform {
  constructor() {
  }

  transform(value) {
    var txt = value.toString();
    var parteEntera = txt.split(".")[0];
    var parteDecimal = txt.split(".")[1];
    while (/(\d+)(\d{3})/gi.test(parteEntera)) {
      parteEntera = parteEntera.replace(/(\d+)(\d{3})/gi, "$1.$2");
    }
    if (parteDecimal != null && parteDecimal.length > 0) {
      return parteEntera + ',' + parteDecimal;
    } else {
      return parteEntera;
    }
  }
}
