import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the DetailvendorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detailvendor',
  templateUrl: 'detailvendor.html',
})
export class DetailvendorPage {


  constructor(public navCtrl: NavController, public navParams: NavParams, public alerCtrl: AlertController, public viewCtrl: ViewController) {


  }

  doAlertcall() {
    let alert = this.alerCtrl.create({
      title: '087832494990',
      buttons: ['Ok']
    });
    alert.present()
  }

  dooAlertemail() {
    let alert = this.alerCtrl.create({
      title: 'mamihmakan@gmail.com',
      buttons: ['Ok']
    });
    alert.present()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailvendorPage');
  }

}
