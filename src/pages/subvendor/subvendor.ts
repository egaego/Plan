import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ListvendorPage} from "../listvendor/listvendor";

/**
 * Generated class for the SubvendorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subvendor',
  templateUrl: 'subvendor.html',
})
export class SubvendorPage {

  vendors : any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public nav: NavController,) {

this.initializeVendors();

  }
  initializeVendors(){
  this.vendors = [
    {
      "icon": "restaurant",
      "name": "Catering",
      "img": 'https://www.kenricks.com/wp-content/uploads/2017/08/cactering-packages-resized.jpg',
    },
    {
      "icon": "camera",
      "name": "Photography",
      "img": 'http://www.weddingmagazine.us/wp-content/uploads/2018/09/Catering-It-Is-Time-to-Get-Ready-for-Wedding-Season.jpg',
    },
    {
      "icon": "bowtie",
      "name": "Hair & Make Up",
      "img": 'https://allurehairsalon.com.au/wp-content/uploads/hair-makeup-wedding.jpg',
    },
    {
      "icon": "hammer",
      "name": "Decoration",
      "img": 'https://cdn0.weddingwire.ca/img_r_10838/8/3/8/0/t30_50_10838.jpg',
    }
  ];
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.initializeVendors();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.vendors = this.vendors.filter((vendor) => {
        return (vendor.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  takeMeBack() {
    this.navCtrl.push("ListvendorPage");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubvendorPage');
  }

}
