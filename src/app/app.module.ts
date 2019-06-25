import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {NotificationsPage} from '../pages/notifications/notifications';

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
import { EmailComposer } from '@ionic-native/email-composer';
import { SocialSharing } from '@ionic-native/social-sharing';
import {Screenshot} from '@ionic-native/screenshot';

@NgModule({
  declarations: [
    MyApp,
    NotificationsPage
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
    NotificationsPage

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
    OneSignal,
    PhotoViewer,
    EmailComposer,
    SocialSharing,
    Screenshot
  ]
})
export class AppModule {}
