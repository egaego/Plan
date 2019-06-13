import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HelpersProvider } from '../../providers/helpers/helpers';

/**
 * Generated class for the InspirationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inspiration',
  templateUrl: 'inspiration.html',
})
export class InspirationPage {
  
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

    this.fileThumbUrl = this.helpersProvider.getBaseUrl() + 'files/galleries/thumbs/';
    this.fileUrl = this.helpersProvider.getBaseUrl() + 'files/galleries/';
    this.exceptionFileThumbUrl = this.helpersProvider.getBaseUrl() + 'files/galleries/thumbs/default.png';

    this.getInspirations();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InspirationPage');
  }


  showPicture(gallery: any) {
    this.helpersProvider.photoViewer.show(gallery.file != null ? this.fileUrl + gallery.file : this.exceptionFileThumbUrl, gallery.name);
  }

  deleteFavorite(gallery: any) {
    console.log(gallery.id);

    this.loading = this.helpersProvider.loadingPresent("Please Wait ...");

    let params = {
    };

    this.apiProvider.delete('gallery/delete/' + gallery.id, params, {'Content-Type':'application/json', "Authorizations": "Bearer " + localStorage.getItem("token")})
      .then((data) => {
        
        let result = JSON.parse(data.data);
        
        this.loading.dismiss();
        this.helpersProvider.toastPresent(result.message);

        this.getInspirations();
      })
      .catch((error) => {
        this.loading.dismiss();
        console.log(error);
        let result = JSON.parse(error.error);
        this.helpersProvider.toastPresent(result.message);
      });
  }

  getInspirations() {
    this.apiProvider.get('gallery/user-galleries?token='+localStorage.getItem('token'), {}, {'Content-Type': 'application/json', 'Authorizations': 'Bearer ' + localStorage.getItem('token')})
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


}
