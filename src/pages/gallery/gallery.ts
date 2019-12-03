import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the GalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {

  galleries: any = [];
  categories: any = [];
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

    this.getGalleries();
    this.getCategories();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GalleryPage');
  }

  showPicture(gallery: any) {
    this.helpersProvider.photoViewer.show(gallery.file != null ? this.fileUrl + gallery.file : this.exceptionFileThumbUrl, gallery.name);
  }

  favorite(gallery: any) {
    console.log(gallery.id);

    this.loading = this.helpersProvider.loadingPresent("Please Wait ...");

    let params = {
    };

    if (gallery.is_favorite == 0) {
      this.apiProvider.post('gallery/store/' + gallery.id, params, {'Content-Type':'application/json', "Authorizations": "Bearer " + localStorage.getItem("token")})
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
      this.apiProvider.delete('gallery/delete/' + gallery.id, params, {'Content-Type':'application/json', "Authorizations": "Bearer " + localStorage.getItem("token")})
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
      
    for ( var i=0 ; i < this.galleries.length; i++) {
      if (this.galleries[i].id == gallery.id) {
        this.galleries[i].is_favorite = !gallery.is_favorite;
      }
    }
  }

  getGalleries() {
    this.apiProvider.get('gallery?token='+localStorage.getItem('token'), {}, {'Content-Type': 'application/json', 'Authorizations': 'Bearer ' + localStorage.getItem('token')})
      .then((data) => {
        let result = JSON.parse(data.data);
        console.log(result);
        for(var o=0; o<result.data.length; o++) {
          console.log(result.data[o].gallery);
        }
        
        this.galleries = result.data;

      })
      .catch((error) => {
        let result = JSON.parse(error.error);
        this.helpersProvider.toastPresent(result.message);
        console.log(error);
      });
  }

  getCategories() {
    this.apiProvider.get('gallery/categories?token='+localStorage.getItem('token'), {}, {'Content-Type': 'application/json', 'Authorizations': 'Bearer ' + localStorage.getItem('token')})
      .then((data) => {
        let result = JSON.parse(data.data);
        console.log(result);
        for(var o=0; o<result.data.length; o++) {
          console.log(result.data[o].gallery);
        }
        
        this.categories = result.data;

      })
      .catch((error) => {
        let result = JSON.parse(error.error);
        this.helpersProvider.toastPresent(result.message);
        console.log(error);
      });
  }

  refreshCategory(item) {
    this.apiProvider.get('gallery/?concept_id='+item.id+'token='+localStorage.getItem('token'), {}, {'Content-Type': 'application/json', 'Authorizations': 'Bearer ' + localStorage.getItem('token')})
      .then((data) => {
        let result = JSON.parse(data.data);
        console.log(result);
        for(var o=0; o<result.data.length; o++) {
          console.log(result.data[o].gallery);
        }
        
        this.galleries = result.data;

      })
      .catch((error) => {
        let result = JSON.parse(error.error);
        this.helpersProvider.toastPresent(result.message);
        console.log(error);
      });
  }

  doRefresh(e) {
    this.getGalleries();
    this.getCategories();
    setTimeout(() => {
      console.log('Async operation has ended');
      e.complete();
    }, 2000);
  }

}
