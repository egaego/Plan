import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelpersProvider } from '../../providers/helpers/helpers';

/**
 * Generated class for the NotifdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifdetail',
  templateUrl: 'notifdetail.html',
})
export class NotifdetailPage {
  
  item: any;
  fileThumbUrl: string;
  fileUrl: string;
  exceptionFileThumbUrl: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public helpersProvider: HelpersProvider) {
    this.item = this.navParams.get('item');
    this.fileUrl = this.helpersProvider.getBaseUrl() + 'files/messages/';
    this.fileThumbUrl = this.helpersProvider.getBaseUrl() + 'files/messages/thumbs/';
    this.exceptionFileThumbUrl = this.helpersProvider.getBaseUrl() + 'files/messages/thumbs/default.png';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotifdetailPage');
  }

  share() {
    this.helpersProvider.socialSharing.share(this.item.description, this.item.name);
  }

}
