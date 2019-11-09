import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PricePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-price',
  templateUrl: 'price.html',
})
export class PricePage {

  item: any;
  packages: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
      this.item = this.navParams.get('item');
      this.packages = this.item.vendor_packages;
      console.log(this.item);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PricePage');
  }

}
