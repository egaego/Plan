import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
// import { HomePage } from '../pages/home/home';
// import {LoginPage} from '../pages/login/login';
// import {RegisterPage} from '../pages/register/register';
// import {ProfilPage} from '../pages/profil/profil';
// import {SubvendorPage} from '../pages/subvendor/subvendor';
// import {GalleryPage} from '../pages/gallery/gallery';
// import {TabsPage} from '../pages/tabs/tabs';
// import {KonsepPage} from '../pages/konsep/konsep';
// import {RincianPage} from '../pages/rincian/rincian';
// import {ListvendorPage} from '../pages/listvendor/listvendor';
// import {DetailvendorPage} from '../pages/detailvendor/detailvendor';
import {NotificationsPage} from '../pages/notifications/notifications';
// import {FormkonsepPage} from '../pages/formkonsep/formkonsep';
// import {SettingPage} from '../pages/setting/setting';
// import {EditprofilePage} from '../pages/editprofile/editprofile';

import { IonicImageViewerModule } from 'ionic-img-viewer';
import { HTTP } from '@ionic-native/http';
import { Device } from '@ionic-native/device';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { Deeplinks } from '@ionic-native/deeplinks';
import { CallNumber } from '@ionic-native/call-number';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ApiProvider } from '../providers/api/api';
import { HelpersProvider } from '../providers/helpers/helpers';
import { DatePicker } from '@ionic-native/date-picker';
import { Base64 } from '@ionic-native/base64';
import { OneSignal } from '@ionic-native/onesignal';

@NgModule({
  declarations: [
    MyApp,
    // HomePage,
    // LoginPage,
    // RegisterPage,
    // ProfilPage,
    // SubvendorPage,
    // GalleryPage,
    // TabsPage,
    // KonsepPage,
    // RincianPage,
    // ListvendorPage,
    // DetailvendorPage,
    NotificationsPage,
    // FormkonsepPage,
    // SettingPage,
    // EditprofilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages:true
    }),
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // HomePage,
    // LoginPage,
    // RegisterPage,
    // ProfilPage,
    // SubvendorPage,
    // GalleryPage,
    // TabsPage,
    // KonsepPage,
    // RincianPage,
    // ListvendorPage,
    // DetailvendorPage,
    NotificationsPage,
    // FormkonsepPage,
    // SettingPage,
    // EditprofilePage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
	  HTTP,
    Device,
    HelpersProvider,
    File,
    Camera,
    DatePicker,
    Deeplinks,
    CallNumber,
    InAppBrowser,
    Base64,
    OneSignal
  ]
})
export class AppModule {}
