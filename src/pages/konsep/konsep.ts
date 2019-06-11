import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormkonsepPage} from "../formkonsep/formkonsep";

/**
 * Generated class for the KonsepPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-konsep',
  templateUrl: 'konsep.html',
})
export class KonsepPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  takeMeBack() {
    this.navCtrl.push(FormkonsepPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KonsepPage');
  }

}
