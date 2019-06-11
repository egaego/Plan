import { Component, ViewChild } from '@angular/core';
import { Platform, Events, ToastController, Nav, LoadingController, AlertController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ApiProvider} from '../providers/api/api';
import { Deeplinks } from '@ionic-native/deeplinks';
import { HelpersProvider } from '../providers/helpers/helpers';
import { OneSignal } from '@ionic-native/onesignal';

//import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';
//import {ProfilPage} from '../pages/profil/profil';
//import {SubvendorPage} from '../pages/subvendor/subvendor';
//import {GalleryPage} from '../pages/gallery/gallery';
//import {TabsPage} from '../pages/tabs/tabs';
//import {ListvendorPage} from '../pages/listvendor/listvendor';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild (Nav) nav: Nav;
  
  rootPage: any = null;
  isLoggedIn: any;
  loading: any;
  
  constructor(
    private platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    private events: Events, 
    private apiProvider: ApiProvider, 
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public deeplinks: Deeplinks,
    public helpers: HelpersProvider,
    public alertCtrl: AlertController,
    public oneSignal: OneSignal,
    public app: App
    ) {
    
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      
      this.isLoggedIn = localStorage.getItem("isLoggedIn");
      
      this.events.subscribe('auth:logout', (token: any) => {
        this.logout(token);
      });

      this.events.subscribe("auth:setLogin", (params: any) => {
        this.setLogin(params);
      })
      
      this.events.subscribe('auth:checkLogin', () => {
        this.checkLogin();
      });
      
      this.events.subscribe('auth:checkLoginPushLogin', () => {
        this.checkLoginPushLogin();
      });
      
      this.events.subscribe('auth:forceLogout', (message: string) => {
        this.forceLogout(message);
      });
      
      console.log(this.isLoggedIn);

      this.oneSignalSetup();

      if (this.isLoggedIn == true) {
        this.rootPage = "TabsPage";
        this.app.getRootNav().setRoot("TabsPage");
      } else {
        this.rootPage = "LoginPage";
      }
    });
  }
  
  oneSignalSetup() {
    this.oneSignal.startInit(
      "47a9ea91-aefe-4ca7-b85e-f788edfe1354",
      "297384737282"
    );

    this.oneSignal.inFocusDisplaying(
      this.oneSignal.OSInFocusDisplayOption.Notification
    );

    this.oneSignal.handleNotificationReceived().subscribe(data => {
      // do something when notification is received
      console.log("handle notification receive", data);
    });

    this.oneSignal.handleNotificationOpened().subscribe(data => {
      // do something when a notification is opened
      console.log("handle notification opened", data);
      this.nav.push("NotificationPage");
    });

    this.oneSignal.getIds().then(data => {
      let pushToken = data.pushToken;
      let userId = data.userId;
      if (pushToken == null) {
        pushToken = "kosong";
      }
      if (userId == null) {
        userId = "kosong";
      }
      localStorage.setItem("firebaseToken", pushToken);
      localStorage.setItem("userIdToken", userId);
      console.log(localStorage.getItem("firebaseToken"));
    });

    this.oneSignal.endInit();
    
  }
  
  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.deeplinks.routeWithNavController(this.nav, {
        //'/': 'WelcomePage',
        '/register-relation': "RegisterRelationPage",
        '/reset-password': "ResetPasswordPage"
      }).subscribe((match) => {
          // match.$route - the route we matched, which is the matched entry from the arguments to route()
          // match.$args - the args passed in the link
          // match.$link - the full link data
          console.log('Successfully matched route', match);
        }, (nomatch) => {
          // nomatch.$link - the full link data
          console.error('Got a deeplink that didn\'t match', nomatch);
          // if (this.isLoggedIn != "1") {
          //   this.rootPage = "TabsPage";
          //   this.nav.setRoot("TabsPage");
          // } else {
          //   this.rootPage = "WelcomePage";
          //   this.nav.setRoot("WelcomePage");
          // }
        });
    });
  }
  
  /**
   * Check login
   */
  checkLogin() {
    if (localStorage.getItem("isLoggedIn") != "1") {
      this.forceLogout("Silahkan login");
    }
  }

  checkLoginPushLogin() {
    if (localStorage.getItem("isLoggedIn") != "1") {
      this.helpers.toastPresent("Please Login.");
      this.helpers.clearLoggedIn();
      this.nav.push("LoginPage", {}, {
        animate: true
      });
    }
  }
  
  setLogin(params: any) {
    let result = params.user;
    localStorage.setItem("isLoggedIn", "1");
    localStorage.setItem("user", JSON.stringify(result.data));
    localStorage.setItem("token", result.data.token);
    localStorage.setItem("user_id", result.data.id);
  }
  
  /**
   * force logout
   */
  forceLogout(message: string) {
    this.helpers.toastPresent(message);
    this.helpers.clearLoggedIn();
    this.app.getRootNav().setRoot("TabsPage");
  }
  
  logout(token: any) {
    
    this.loading = this.loadingCtrl.create({
        content: "Please Wait ..."
      });
      this.loading.present();
    
    this.apiProvider.post('auth/logout', {}, {"Content-Type": "application/json", "Authorization": "Bearer " + token})
    .then ((data) => {
      
      this.helpers.clearLoggedIn();
      
      let result = JSON.parse(data.data);
      this.loading.dismiss();
      this.toastCtrl.create({
        message: result.message,
        duration: 3000,
        position: 'buttom',
        dismissOnPageChange: false,
      }).present();
      
      this.app.getRootNav().setRoot("LoginPage");
    })
    .catch((error) => {
      
      this.helpers.clearLoggedIn();
      
      this.loading.dismiss();
      
      this.toastCtrl.create({
         message: "Logout success",
         duration: 3000,
         position: 'buttom',
         dismissOnPageChange: false,
       }).present();
       
       this.app.getRootNav().setRoot("LoginPage");
    });
  }
}