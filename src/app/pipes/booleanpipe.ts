import {PipeTransform, Pipe} from "@angular/core";

@Pipe({
  name: "toboolean"
})
export class ToBooleanPipe implements PipeTransform {
  constructor() {
  }

  transform(value) {
    var valor = value.toString();
    if (valor == 'true') {
      return true;
    } else if (valor == 'false') {
      return false;
    } else {
      return null;
    }
  }
}


@Pipe({
  name: "booleantosino"
})
export class BooleanToSinoPipe implements PipeTransform {
  constructor() {
  }

  transform(value) {
    if (value) {
      return "Sí";
    } else if (!value) {
      return "No";
    } else {
      return "";
    }
  }
}

