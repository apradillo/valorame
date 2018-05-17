import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FormsModule } from '@angular/forms';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SafePipe } from "./pipes/safepipe";
import { PuntosMilesPipe } from "./pipes/numberpipe";
import { ToBooleanPipe } from "./pipes/booleanpipe";
import { BooleanToSinoPipe } from "./pipes/booleanpipe";
import { CapitalizePipe } from "./pipes/stringpipe";

import { LocalStorageService } from '../providers/localStorage';
import { ApiService } from '../providers/api';
import { AlertService } from '../providers/alert';
import { ModalService } from '../providers/modal';
import { UtilsService } from '../providers/utils';
import { ConfigService } from '../providers/config';
import { ImagesService } from '../providers/image';

import { Ionic2RatingModule } from 'ionic2-rating';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { CategoriasListadoPage } from '../pages/categorias-listado/categorias-listado';
import { CategoriasDetallePage } from '../pages/categorias-detalle/categorias-detalle';
import { CategoriasEditarPage } from '../pages/categorias-editar/categorias-editar';
import { ElementosEditarPage } from '../pages/elementos-editar/elementos-editar';
import { ElementosListadoPage } from '../pages/elementos-listado/elementos-listado';


@NgModule({
  declarations: [
    SafePipe,
    PuntosMilesPipe,
    ToBooleanPipe,
    BooleanToSinoPipe,
    CapitalizePipe,
    MyApp,
    HomePage,
    CategoriasListadoPage,
    CategoriasDetallePage,
    CategoriasEditarPage,
    ElementosListadoPage,
    ElementosEditarPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      platforms: {
        ios: {
          backButtonText: ""
        }
      }
    }),
    Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CategoriasListadoPage,
    CategoriasDetallePage,
    CategoriasEditarPage,
    ElementosListadoPage,
    ElementosEditarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AlertService,
    ModalService,
    UtilsService,
    ApiService,
    ConfigService,
    LocalStorageService,
    ImagesService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
