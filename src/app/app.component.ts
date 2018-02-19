import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {LoginPage} from "../pages/login/login";
import {PreferencesPage} from "../pages/preferences/preferences";
import { RegisterPage } from "../pages/register/register";
import { AuthServiceProvider, User } from "../providers/auth-service/auth-service"
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  username = '';
  email = '';

  rootPage: any = HomePage;
  //rootPage: any = 'LoginPage';

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private auth: AuthServiceProvider) {
    this.initializeApp();

    if (auth.isConnected == false) {
      this.pages = [
        {title: 'Se connecter', component: LoginPage},
        {title: 'Inscription', component: RegisterPage}
      ];
    } else {
      this.pages = [
        { title: 'Home', component: HomePage },
        { title: 'List', component: ListPage },
        { title: 'Preferences', component: PreferencesPage }
      ];
    }


  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
