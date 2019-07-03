import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ToastController, NavParams, Events } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

import {DetailvendorPage} from '../detailvendor/detailvendor';
import { ApiProvider } from '../../providers/api/api';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { InAppBrowserOptions } from '@ionic-native/in-app-browser';

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
  item: any;
  vendors : any = [];
  defaultVendors : any = [];
  fileThumbUrl: string;
  fileUrl: string;
  exceptionFileThumbUrl: string;
  loading: any;

  browserOptions: InAppBrowserOptions = {
    zoom: 'yes',
    toolbar: 'yes'
  }

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public helpersProvider: HelpersProvider,
    public events: Events,
    public apiProvider: ApiProvider) {
      this.item = this.navParams.get('item');
      console.log(this.item.id);
      this.fileUrl = this.helpersProvider.getBaseUrl() + 'files/vendors/';
      this.fileThumbUrl = this.helpersProvider.getBaseUrl() + 'files/vendors/thumbs/';
      this.exceptionFileThumbUrl = this.helpersProvider.getBaseUrl() + 'files/concepts/thumbs/default.png';
      // this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
      this.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListvendorPage');
  }

  seeInMap(vendor) {
    this.helpersProvider.inAppBrowser.create('https://www.google.com/maps/?q=' + vendor.latitude + ',' + vendor.longitude, '_blank', this.browserOptions);
    // console.log('Send clicked');
    // let toast = this.toastCtrl.create({
    //   message: 'Seeing ' + vendor.name + ' on maps.',
    //   duration: 3000,
    //   position: 'button',
    //   cssClass: 'dark-trans',
    //   closeButtonText: 'OK',
    //   showCloseButton: true
    // });
    // toast.present();
    // alert('Seeing ' + vendor.name + ' on maps.');
  }

  getData() {
    this.apiProvider.get('vendor/detail/'+this.item.id+'?token='+localStorage.getItem('token'), {}, {'Content-Type': 'application/json', 'Authorizations': 'Bearer ' + localStorage.getItem('token')})
      .then((data) => {
        let result = JSON.parse(data.data);

        this.vendors = result.data;
        this.defaultVendors = result.data;

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

  detail(item: any) {
    this.navCtrl.push("DetailvendorPage", {item: item});
  }

  doRefresh(e) {
    this.getData();
    setTimeout(() => {
      console.log('Async operation has ended');
      e.complete();
    }, 2000);
  }

  favorite(item: any) {
    console.log(item.id);

    this.loading = this.helpersProvider.loadingPresent("Please Wait ...");

    let params = {
    };

    if (item.is_favorite == 0) {
      this.apiProvider.post('vendor/store/' + item.id, params, {'Content-Type':'application/json', "Authorizations": "Bearer " + localStorage.getItem("token")})
        .then((data) => {

          let result = JSON.parse(data.data);

          this.loading.dismiss();
          this.helpersProvider.toastPresent(result.message);
        })
        .catch((error) => {
          this.loading.dismiss();
          console.log(error);
          let result = JSON.parse(error.error);
          this.helpersProvider.toastPresent(result.message);
        });
    } else {
      this.apiProvider.delete('vendor/delete/' + item.id, params, {'Content-Type':'application/json', "Authorizations": "Bearer " + localStorage.getItem("token")})
        .then((data) => {

          let result = JSON.parse(data.data);

          this.loading.dismiss();
          this.helpersProvider.toastPresent(result.message);
        })
        .catch((error) => {
          this.loading.dismiss();
          console.log(error);
          let result = JSON.parse(error.error);
          this.helpersProvider.toastPresent(result.message);
        });
    }

    for ( var i=0 ; i < this.vendors.length; i++) {
      if (this.vendors[i].id == item.id) {
        this.vendors[i].is_favorite = !item.is_favorite;
      }
    }
  }

}
