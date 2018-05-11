import { Injectable } from "@angular/core";
import { LocalStorageService } from "./localStorage";

@Injectable()
export class ConfigService {

    constructor(public localStorage: LocalStorageService) {
    }

    initApp(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.checkConfig()
                .then((ok) => {
                    if (!ok) {
                        this.setConfig()
                            .then(() => {
                                resolve(true);
                            });
                    } else {
                        resolve(true);
                    }
                });
        });
    }

    private checkConfig(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            let ok: boolean;
            this.localStorage.get('categorias')
                .then((data) => {
                    this.localStorage.get('elementos')
                        .then((data) => {
                            this.localStorage.get('valoraciones')
                                .then((data) => {
                                    resolve(true);
                                })
                                .catch((err) => {
                                    resolve(false);
                                })
                        })
                        .catch((err) => {
                            resolve(false);
                        })
                })
                .catch((err) => {
                    resolve(false);
                });
        });
    }

    private setConfig(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.localStorage.set('categorias', []);
            this.localStorage.set('elementos', []);
            this.localStorage.set('valoraciones', []);
            resolve(true);
        });
    }
}