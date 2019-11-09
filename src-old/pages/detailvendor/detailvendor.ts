import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { InAppBrowserOptions } from '@ionic-native/in-app-browser';

/**
 * Generated class for the DetailvendorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detailvendor',
  templateUrl: 'detailvendor.html',
})
export class DetailvendorPage {

  item: any;
  fileThumbUrl: string;
  fileUrl: string;
  exceptionFileThumbUrl: string;
  loading: any;
  browserOptions: InAppBrowserOptions = {
    zoom: 'no',
    toolbar: 'yes'
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alerCtrl: AlertController,
    public viewCtrl: ViewController,
    public helpersProvider: HelpersProvider,
    public events: Events,
    public apiProvider: ApiProvider
  ) {
    this.item = this.navParams.get('item');
    this.fileThumbUrl = this.helpersProvider.getBaseUrl() + 'files/vendors/thumbs/';
    this.fileUrl = this.helpersProvider.getBaseUrl() + 'files/vendors/';
    this.exceptionFileThumbUrl = this.helpersProvider.getBaseUrl() + 'files/galleries/thumbs/default.png';
  }

  doAlertcall() {
    this.helpersProvider.callNumber.callNumber(this.item.phone, true)
      .then(() => {
        console.log('success');
      })
      .catch(() => {});
  }

  dooAlertemail() {
    let email = {
      to: this.item.email,
      subject: 'PlanYourDays.id - ' + this.item.name,
      body: '',
      isHtml: true
    }
    this.helpersProvider.emailComposer.open(email);
  }

  instagram() {
    //this.helpersProvider.inAppBrowser.create('https://www.instagram.com/' + this.item.instagram, '_blank', this.browserOptions);
   this.helpersProvider.inAppBrowser.create('https://www.instagram.com/' + this.item.instagram, '_blank', this.browserOptions);
  }

  facebook() {
    this.helpersProvider.inAppBrowser.create('https://www.facebook.com/' + this.item.facebook, '_blank', this.browserOptions);
  }

  getFile() {
    return this.item.file != null ? this.fileThumbUrl + this.item.file : this.exceptionFileThumbUrl;
  }

  share() {
    this.helpersProvider.socialSharing.share(this.item.name, this.item.name, this.getFile(), this.item.website);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailvendorPage');
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

    this.item.is_favorite = !this.item.is_favorite;
  }

}
