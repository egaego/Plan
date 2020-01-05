import { Component } from '@angular/core';
import {IonicPage, NavController, AlertController, ToastController, MenuController, NavParams, Events, App} from "ionic-angular";
import { HelpersProvider } from '../../providers/helpers/helpers';
import {ApiProvider} from '../../providers/api/api';

/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {

  item: any;
  vendorItem: any;
  fileThumbUrl: string;
  fileUrl: string;
  fileDetailUrl: string;
  exceptionFileThumbUrl: string;
  star1: any;
  star2: any;
  star3: any;
  star4: any;
  star5: any;
  rate: any;
  description: any;
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public helpersProvider: HelpersProvider, public api: ApiProvider, public app: App) {
    this.item = this.navParams.get('item');
    this.vendorItem = this.navParams.get('vendorItem');
    this.fileThumbUrl = this.helpersProvider.getBaseUrl() + 'files/vendors/thumbs/';
    this.fileUrl = this.helpersProvider.getBaseUrl() + 'files/vendors/';
    this.fileDetailUrl = this.helpersProvider.getBaseUrl() + 'files/vendor-details/';
    this.exceptionFileThumbUrl = this.helpersProvider.getBaseUrl() + 'files/galleries/thumbs/default.png';

    this.star1 = "star-outline";
    this.star2 = "star-outline";
    this.star3 = "star-outline";
    this.star4 = "star-outline";
    this.star5 = "star-outline";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }

  submit() {
    // this.helpersProvider.toastPresent(this.description + ' ' + this.rate);

    this.loading = this.helpersProvider.loadingPresent("Submitting ...");

      let params = {
        "transaction_id": this.item.id, 
        "transaction_detail_id": this.vendorItem.id, 
        "vendor_id": this.vendorItem.vendor_id,
        "rate": this.rate, 
        "comment": this.description
      };

      console.log(params);
      
      this.api.post('transaction/rating', params, {'Content-Type':'application/json', "Authorizations": "Bearer " + localStorage.getItem("token")})
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
        });
  }

  rating(star) {

    switch(star) {
      case 1:
        this.rate = 1;
        this.star1 = "star";
        this.star2 = "star-outline";
        this.star3 = "star-outline";
        this.star4 = "star-outline";
        this.star5 = "star-outline";
        break;
      case 2:
        this.rate = 2;
        this.star1 = "star";
        this.star2 = "star";
        this.star3 = "star-outline";
        this.star4 = "star-outline";
        this.star5 = "star-outline";
        break;
      case 3:
        this.rate = 3;
        this.star1 = "star";
        this.star2 = "star";
        this.star3 = "star";
        this.star4 = "star-outline";
        this.star5 = "star-outline";
        break;
      case 4:
        this.rate = 4;
        this.star1 = "star";
        this.star2 = "star";
        this.star3 = "star";
        this.star4 = "star";
        this.star5 = "star-outline";
        break;
      case 5:
        this.rate = 5;
        this.star1 = "star";
        this.star2 = "star";
        this.star3 = "star";
        this.star4 = "star";
        this.star5 = "star";
        break;
    }

  }
}
