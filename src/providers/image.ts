import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ImagesService {
   private _READER: any = new FileReader();

   constructor() { }

   handleImageSelection(event: any): Observable<any> {
      let file: any = event.target.files[0];

      this._READER.readAsDataURL(file);
      return Observable.create((observer) => {
         this._READER.onloadend = () => {
            observer.next(this._READER.result);
            observer.complete();
         }
      });
   }

   isCorrectFileType(file) {
      return (/^(gif|jpg|jpeg|png)$/i).test(file);
   }  
}