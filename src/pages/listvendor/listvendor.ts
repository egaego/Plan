import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController, ToastController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

import {DetailvendorPage} from '../detailvendor/detailvendor';

/**
 * Generated class for the ListvendorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listvendor',
  templateUrl: 'listvendor.html',
})
export class ListvendorPage {
  // tabBarElement: any;
  vendors : any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,public forgotCtrl: AlertController, public toastCtrl: ToastController) {
    // this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.vendors = [
      {
        "icon": "restaurant",
        "name": "Mamah Catering",
        "alamat": "Semanan, Kalideres, Jakarta Barat",
        "harga": "500K",
        "img": 'https://www.kenricks.com/wp-content/uploads/2017/08/cactering-packages-resized.jpg',
      },
      {
        "icon": "restaurant",
        "name": "Padang Selera",
        "alamat": "Kebon Jeruk, Kalideres, Jakarta Barat",
        "harga": "2 Juta",
        "img": 'https://www.kenricks.com/wp-content/uploads/2017/08/cactering-packages-resized.jpg',
      },
      {
        "icon": "restaurant",
        "name": "Nasi Uduk",
        "alamat": "Puri, Kebon Jeruk, Jakarta Barat",
        "harga": "700k",
        "img": 'https://www.kenricks.com/wp-content/uploads/2017/08/cactering-packages-resized.jpg',
      },

    ];
  }

  // ionViewWillEnter() {
  //   this.tabBarElement.style.display = 'none';
  // }
  //
  // ionViewWillLeave() {
  //   this.tabBarElement.style.display = 'flex';
  // }

  takeMeBack() {
    this.navCtrl.push("DetailvendorPage");
  }

  //goBack() {
    //this.navCtrl.pop();
//}
  ionViewDidLoad() {
    console.log('ionViewDidLoad ListvendorPage');
  }

  seeInMap(vendor) {
    console.log('Send clicked');
    let toast = this.toastCtrl.create({
      message: 'Seeing ' + vendor.name + ' on maps.',
      duration: 3000,
      position: 'button',
      cssClass: 'dark-trans',
      closeButtonText: 'OK',
      showCloseButton: true
    });
    toast.present();
    // alert('Seeing ' + vendor.name + ' on maps.');
  }

}
