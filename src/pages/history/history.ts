import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  item: any;
  models : any = [];
  defaultVendors : any = [];
  fileThumbUrl: string;
  fileUrl: string;
  exceptionFileThumbUrl: string;
  loading: any;
  
  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public helpersProvider: HelpersProvider,
    public events: Events,
    public apiProvider: ApiProvider) {
      this.loading = this.helpersProvider.loadingPresent("Please Wait ...");
      this.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListvendorPage');
  }

  getData() {
    this.apiProvider.get('transaction/histories?token='+localStorage.getItem('token'), {}, {'Content-Type': 'application/json', 'Authorizations': 'Bearer ' + localStorage.getItem('token')})
      .then((data) => {
        let result = JSON.parse(data.data);

        this.models = result.data;
        console.log(this.models);
        this.loading.dismiss();

      })
      .catch((error) => {
        this.loading.dismiss();
        let result = JSON.parse(error.error);
        this.helpersProvider.toastPresent(result.message);
        if (result.status == '401') {
          this.events.publish("auth:forceLogout", result.message);
        }
        console.log(error);
      });
  }

  doRefresh(e) {
    this.getData();
    setTimeout(() => {
      console.log('Async operation has ended');
      e.complete();
    }, 2000);
  }

  toDetail(item) {
    this.navCtrl.push("HistoryDetailPage", {item: item});
  }

  getStatus(item) {
    if (item.status == 0) {
      return "Cancel";
    }
    if (item.status == 1) {
      return "Draft";
    }
    if (item.status == 5) {
      return "Pending";
    }
    if (item.status == 8) {
      return "Confirmed";
    }
    if (item.status == 10) {
      return "Successful";
    }
    if (item.status == 15) {
      return "Delivered";
    }

  }

  getClass(item) {
    if (item.status == 0) {
      return "tstatc";
    }
    if (item.status == 1) {
      return "tstatp";
    }
    if (item.status == 5) {
      return "tstatp";
    }
    if (item.status == 8) {
      return "tstatp";
    }
    if (item.status == 10) {
      return "tstats";
    }
    if (item.status == 15) {
      return "tstats";
    }

  }

}
