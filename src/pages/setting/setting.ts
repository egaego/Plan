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

  isNotification: boolean;

  constructor(
    public navCtrl: NavController, 
    private events: Events,
    public navParams: NavParams) {
      this.isNotification = (localStorage.getItem("isNotification") == 'true') ? true : false;
  }

  // logout
  logout() {
    this.events.publish("auth:logout", localStorage.getItem("token"));
  }

  editProfile() {
    this.navCtrl.push("EditProfilePage");
  }

  changePassword() {
    this.navCtrl.push("ChangePasswordPage");
  }

  relationProfileDetail() {
    this.navCtrl.push("RelationProfileDetailPage");
  }

  notification(event) {
    console.log(this.isNotification);
    console.log(localStorage.getItem("isNotification"));
    localStorage.setItem("isNotification", !this.isNotification + '');
  }

  aboutUs() {
    this.navCtrl.push("StaticPage", {
      id: 2,
      header: "Tentang Kami"
    });
  }

  privacyPolicy() {
    this.navCtrl.push("StaticPage", {
      id: 1,
      header: "Kebijakan Privasi"
    });
  }

  reportProblem() {
    this.navCtrl.push("ReportProblemPage");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

}
