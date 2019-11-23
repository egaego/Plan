import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, App } from 'ionic-angular';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the PembayaranPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pembayaran',
  templateUrl: 'pembayaran.html',
})
export class PembayaranPage {

  total: any;
  item: any;
  banks: any;
  loading: any;
  trx_id: any;
  bankId: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public helpersProvider: HelpersProvider,
    public events: Events,
    public apiProvider: ApiProvider,
    public app: App
  ) {
    this.item = this.navParams.get('item');
    this.total = this.navParams.get('total');
    this.trx_id = this.navParams.get('trx_id');
    this.loading = this.helpersProvider.loadingPresent("Please Wait ...");
    this.getDataBank();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PembayaranPage');
  }

  getDataBank() {
    this.apiProvider.get('list-bank?token='+localStorage.getItem('token'), {}, {'Content-Type': 'application/json', 'Authorizations': 'Bearer ' + localStorage.getItem('token')})
      .then((data) => {
        let result = JSON.parse(data.data);
        this.banks = result.data;
        this.loading.dismiss();

      })
      .catch((error) => {
        let result = JSON.parse(error.error);
        this.helpersProvider.toastPresent(result.message);
        if (result.status == '401') {
          this.events.publish("auth:forceLogout", result.message);
        }
        this.loading.dismiss();
        console.log(error);
      });
  }

  selectedBank(selected) {
    this.bankId = selected;
  }

  doSubmitTransaction() {
    if (this.bankId == null) {
      this.helpersProvider.toastPresent("Bank belum di pilih");
      return;
    }

    this.loading = this.helpersProvider.loadingPresent("Please Wait ...");
    let params = {
      "user_id" : localStorage.getItem("user_id"),
      "transaction_id" : this.trx_id,
      "bank_id" : this.bankId
    }

    this.apiProvider.post('transaction/store', params, {'Content-Type':'application/json', "Authorizations": "Bearer " + localStorage.getItem("token")})
        .then((data) => {        
          let result = JSON.parse(data.data);
          
          this.loading.dismiss();
          this.helpersProvider.toastPresent(result.message);

          this.app.getRootNav().setRoot("TabsPage");
        })
        .catch((error) => {
          this.loading.dismiss();
          console.log(error);
          let result = JSON.parse(error.error);
          this.helpersProvider.toastPresent(result.message);

          this.app.getRootNav().setRoot("TabsPage");
        });
  }

}
