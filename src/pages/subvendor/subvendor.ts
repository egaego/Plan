import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import {ListvendorPage} from "../listvendor/listvendor";
import { HelpersProvider } from '../../providers/helpers/helpers';
import { ApiProvider } from '../../providers/api/api';

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
  defaultVendors : any = [];
  fileThumbUrl: string;
  fileUrl: string;
  exceptionFileThumbUrl: string;
  loading: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public nav: NavController,
    public helpersProvider: HelpersProvider,
    public events: Events,
    public apiProvider: ApiProvider
  ) {
    this.fileUrl = this.helpersProvider.getBaseUrl() + 'files/concepts/';
    this.exceptionFileThumbUrl = this.helpersProvider.getBaseUrl() + 'files/concepts/thumbs/default.png';

    this.getConcepts();

  }

  detail(item: any) {
    this.navCtrl.push("ListvendorPage", {item: item});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubvendorPage');
  }

  getItems(ev) {

    this.vendors = this.defaultVendors;

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.vendors = this.vendors.filter((vendor) => {
        return (vendor.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  onCancel(ev) {

  }

  getConcepts() {
    this.apiProvider.get('vendor/concept?token='+localStorage.getItem('token'), {}, {'Content-Type': 'application/json', 'Authorizations': 'Bearer ' + localStorage.getItem('token')})
      .then((data) => {
        console.log(data);
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

  doRefresh(e) {
    this.getConcepts();
    setTimeout(() => {
      console.log('Async operation has ended');
      e.complete();
    }, 2000);
  }

}
