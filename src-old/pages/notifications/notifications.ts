import { Component } from '@angular/core';
import { ViewController, Events, NavParams, NavController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HelpersProvider } from '../../providers/helpers/helpers';

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

  messages: any;

  constructor(
    public viewCtrl: ViewController,
    private helpersProvider: HelpersProvider,
    private events: Events,
    public apiProvider: ApiProvider,
    public navCtrl: NavController, 
    public navParams: NavParams
    ) {

      this.getData();
  }

  toToMessage(message) {
    this.navCtrl.push("NotifdetailPage", {item: message});
    this.viewCtrl.dismiss();
  }

  getData() {
    this.apiProvider.get('messages?token='+localStorage.getItem('token'), {}, {'Content-Type': 'application/json', 'Authorizations': 'Bearer ' + localStorage.getItem('token')})
      .then((data) => {
        let result = JSON.parse(data.data);

        this.messages = result.data;

      })
      .catch((error) => {
        let result = JSON.parse(error.error);
        this.helpersProvider.toastPresent(result.message);
        if (result.status == '401') {
          this.events.publish("auth:forceLogout", result.message);
        }
        console.log(error);
      });
  }
}
