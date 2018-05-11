
import { Injectable } from "@angular/core";

@Injectable()
export class LocalStorageService {

   constructor() {}

   get(key:string): Promise<any> {
      return new Promise<any>((resolve, reject) => {
         try {
            if (localStorage.getItem(key) != undefined && localStorage.getItem(key) != null) {
                let resultado = JSON.parse(localStorage.getItem(key));
               resolve(resultado);
            } else {
               reject(key + ": undefined or null");
            }
         } catch(err) {
            reject(err);
         }
      });
   }

   set(key:string, value:any): Promise<boolean> {
      return new Promise<any>((resolve, reject) => {
         try {
            localStorage.setItem(key, JSON.stringify(value));
            resolve(true);
         }
         catch(err) {
            reject(err);
         }         
      });
   }

   remove(key:string): Promise<boolean> {
      return new Promise<any>((resolve, reject) => {
         try {
            localStorage.removeItem(key);
            resolve(true);
         }
         catch(err) {
            reject(err);
         }   
      });
   }

   clear(): Promise<boolean> {
      return new Promise<any>((resolve, reject) => {
         try {
            localStorage.clear();
            resolve(true);
         }
         catch(err) {
            reject(err);
         }   
      });
   }

   length(): Promise<number> {
      return new Promise<any>((resolve, reject) => {
         try {
            if (localStorage != undefined && localStorage != null) {
               resolve(localStorage.length);
            } else {
               resolve(0);
            }            
         }
         catch(err) {
            reject(err);
         }  
      });
   }

}