import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  constructor(
    public navCtrl: NavController, 
    private events: Events,
    public navParams: NavParams) {
  }

  // logout
  logout() {
    this.events.publish("auth:logout", localStorage.getItem("token"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

}
