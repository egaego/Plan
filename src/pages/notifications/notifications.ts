import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  constructor(public viewCtrl: ViewController) {
  }

  close() {
    this.viewCtrl.dismiss();
  }


}
