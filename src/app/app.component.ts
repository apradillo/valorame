import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AlertService } from '../providers/alert';
import { ConfigService } from '../providers/config';
import { CategoriasListadoPage } from '../pages/categorias-listado/categorias-listado';
import { ElementosListadoPage } from '../pages/elementos-listado/elementos-listado';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{ title: string, icon: string, active: boolean, component: any, visible: boolean, params: any, root: boolean }> = [];
  fechaActual: string;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public menu: MenuController,
    public alertService: AlertService,
    public configService: ConfigService) {

    // used for an example of ngFor and navigation
    this.pages = [
      {
        title: 'Inicio',
        icon: 'home',
        active: true,
        component: HomePage,
        visible: true,
        params: {},
        root: true
      },
      {
        title: 'Categorías',
        icon: 'folder',
        active: true,
        component: CategoriasListadoPage,
        visible: true,
        params: { startSearching: true },
        root: true
      },
      {
        title: 'Elementos',
        icon: 'paper',
        active: true,
        component: ElementosListadoPage,
        visible: true,
        params: { startSearching: true },
        root: true
      },
      {
        title: 'Ranking',
        icon: 'paper',
        active: false,
        component: null,
        visible: false,
        params: { startSearching: true },
        root: true
      }
    ];

    this.fechaActual = "31/12/1988";

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();

      this.configService.initApp()
        .then((ok) => {
          this.splashScreen.hide();
        });

    });
  }

  openPage(page) {
    if (page.visible) {
      if (page.active) {
        this.menu.close();
        if (page.root) {
          this.nav.setRoot(page.component, page.params);
        } else {
          this.nav.push(page.component, page.params);
        }
      } else {
        this.alertService.showToast('Próximamente');
      }
    }
  }

}
