import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {LoginPage} from "../login/login";
//import {HomePage} from "../home/home";
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  // register and go to home page
  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
  }

  register(){
  //Api connections
  this.navCtrl.push(TabsPage);
  }

  // go to login page
  login() {
    this.navCtrl.push(LoginPage);
  }
}
