import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the FavoritevendorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favoritevendor',
  templateUrl: 'favoritevendor.html',
})
export class FavoritevendorPage {

  galleries: any = [];
  fileThumbUrl: string;
  fileUrl: string;
  exceptionFileThumbUrl: string;
  loading: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public helpersProvider: HelpersProvider,
    public events: Events,
    public apiProvider: ApiProvider
  ) {

    this.fileThumbUrl = this.helpersProvider.getBaseUrl() + 'files/vendors/thumbs/';
    this.fileUrl = this.helpersProvider.getBaseUrl() + 'files/vendors/';
    this.exceptionFileThumbUrl = this.helpersProvider.getBaseUrl() + 'files/galleries/thumbs/default.png';

    this.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InspirationPage');
  }

  deleteFavorite(gallery: any) {
    console.log(gallery.id);

    this.loading = this.helpersProvider.loadingPresent("Please Wait ...");

    let params = {
    };

    this.apiProvider.delete('vendor/delete/' + gallery.id, params, {'Content-Type':'application/json', "Authorizations": "Bearer " + localStorage.getItem("token")})
      .then((data) => {
        
        let result = JSON.parse(data.data);
        
        this.loading.dismiss();
        this.helpersProvider.toastPresent(result.message);

        this.getData();
      })
      .catch((error) => {
        this.loading.dismiss();
        console.log(error);
        let result = JSON.parse(error.error);
        this.helpersProvider.toastPresent(result.message);
      });
  }

  getData() {
    this.apiProvider.get('vendor/user-vendor?token='+localStorage.getItem('token'), {}, {'Content-Type': 'application/json', 'Authorizations': 'Bearer ' + localStorage.getItem('token')})
      .then((data) => {
        console.log(data);
        let result = JSON.parse(data.data);
        
        this.galleries = result.data;

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
    this.getData();
    setTimeout(() => {
      console.log('Async operation has ended');
      e.complete();
    }, 2000);
  }


  detail(item: any) {
    this.navCtrl.push("DetailvendorPage", {item: item});
  }

  seeInMap(vendor) {
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

}
