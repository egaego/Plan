import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelpersProvider } from '../../providers/helpers/helpers';

/**
 * Generated class for the HistoryDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history-detail',
  templateUrl: 'history-detail.html',
})
export class HistoryDetailPage {

  item: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public helpersProvider: HelpersProvider) {
    this.item = this.navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryDetailPage');
  }

  ratingPage(vendorItem: any) {
    if (vendorItem.is_rating == 1) {
      this.navCtrl.push("FeedbackPage", {item: this.item, vendorItem: vendorItem});
      return;
    }
    this.helpersProvider.toastPresent("Anda sudah melakukan penilaian");
    
  }

}
