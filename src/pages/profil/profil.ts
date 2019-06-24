import { Component } from '@angular/core';
import { IonicPage, NavController, PopoverController, App, Platform, AlertController, Events, ActionSheetController } from 'ionic-angular';

import {NotificationsPage} from "../notifications/notifications";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ApiProvider } from '../../providers/api/api';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { Base64 } from '@ionic-native/base64';
import { File } from '@ionic-native/file';

/**
 * Generated class for the ProfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {

  loading: any;
  token: any;
  relation_name: any;
  venue: any;
  wedding_day: any;
  user: any = {};
  defaultPhoto: any = "assets/imgs/profile.jpg";
  defaultPhotoProfile: any = "assets/imgs/photo-profile.png";
  photo: any = this.defaultPhoto;
  photoProfile: any = this.defaultPhotoProfile;
  dirs: any;
  openFileOptions: CameraOptions = {
    allowEdit: true,
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    targetWidth: 780,
    targetHeight: 560,
  };
  photoUrl: any;
  photoProfileUrl: any;
  backgroundPhoto: any;
  
  days: any = '-';
  hours: any = '-';
  minutes: any = '-';
  seconds: any = '-';
  bannerHeight: any;
  isRequired: boolean = false;
  requiredLabel: any = '';
  requiredPage: any = '';

  constructor(
    public navCtrl: NavController, 
    public file: File,
    private camera: Camera,
    public apiProvider: ApiProvider,
    public helpersProvider: HelpersProvider,
    public app: App,
    public platform: Platform,
    public alertCtrl: AlertController,
    public events: Events,
    public actionSheetCtrl: ActionSheetController,
    public base64: Base64,
    public popoverCtrl: PopoverController
  ) {
    this.events.publish("auth:checkLogin");
    this.photoUrl = this.helpersProvider.getBaseUrl() + "files/user-relations/";
    this.photoProfileUrl = this.helpersProvider.getBaseUrl() + "files/users/";
    this.token = localStorage.getItem('token');
    this.getUser();

    this.getCountdown();
    setInterval(() => { 
      this.getCountdown(); 
    }, 1000);
  }

  onClickRequiredLabel() {
    this.navCtrl.push(this.requiredPage);
  }

  getUser() {
    this.apiProvider.get('user/show/' + localStorage.getItem('user_id'), {}, {'Content-Type': 'application/json', "Authorizations": "Bearer " + localStorage.getItem("token")})
      .then((data) => {
        console.log(data);
        let result = JSON.parse(data.data);
        
        if (result.data.relation.venue == null) {
          this.isRequired = true;
          this.requiredLabel = 'Silahkan atur tanggal pernikahan dan tempat pernikahan Anda di menu Edit Profile';
          this.requiredPage = "EditProfilePage";
        } else if (result.data.relation.partner.name == null) {
          this.isRequired = true;
          this.requiredLabel = 'Silahkan daftarkan pasangan Anda di menu Detail Pasangan Anda';
          this.requiredPage = "RelationProfileDetailPage";
          this.relation_name = "Anonymous";
        } else {
          this.isRequired = false;
          this.relation_name = result.data.relation.partner.name;
        }
        this.wedding_day = result.data.relation.wedding_day;
        this.venue = result.data.relation.venue;
        if (result.data.relation.photo != null) {
          this.photo = this.photoUrl + result.data.relation.photo;
        }
        
        this.user = result.data;

      })
      .catch((error) => {
        this.user = {};
        let result = JSON.parse(error.error);
        if (result.status == '401') {
          this.events.publish("auth:forceLogout", result.message);
        }
        console.log(error);
      });
  }
  
  openFile() {
    this.camera.getPicture(this.openFileOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      
      this.loading = this.helpersProvider.loadingPresent("");
      
      let params = {
        "photo_base64": 'data:image/jpeg;base64,' + imageData
      }

      this.apiProvider.post("user/upload-photo/" + localStorage.getItem("user_id"), params, {"Content-Type": "application/json", "Authorizations": "Bearer " + localStorage.getItem("token")})
        .then((data) => {
          
          let result = JSON.parse(data.data);
          
          this.loading.dismiss();
          
          this.photo = this.photoUrl + result.data.relation.photo;
          
          this.helpersProvider.toastPresent(result.message);
          
        })
        .catch((error) => {
          let result = JSON.parse(error.data);
          
          this.loading.dismiss();
          if (result.status == '401') {
            this.events.publish("auth:forceLogout", result.message);
          }
          
          this.helpersProvider.toastPresent(result.message);
        });
      
    }, (err) => {
      // Handle error
        console.log(err);
    });
  }

  pad(n) {
    return (n < 10 ? '0' : '') + n;
  }
  
  goToSetting() {
    this.navCtrl.push("SettingPage");
  }

  goToFavVendor() {
    this.navCtrl.push("FavoritevendorPage"); 
  }

  goToInspiration() {
    this.navCtrl.push("InspirationPage"); 
  }
  
  doUploadPhoto() {
    let actionSheet = this.actionSheetCtrl.create({
      title: name,
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            
            let alert = this.alertCtrl.create({
              title: 'Anda yakin ingin menghapus foto ini?',
              buttons: [
                {
                  text: 'Tidak',
                  handler: () => {
                    console.log('Disagree clicked');
                  }
                },
                {
                  text: 'Ya',
                  handler: () => {
                    this.loading = this.helpersProvider.loadingPresent("");
                    this.deletePhoto();
                  }
                }
              ]
            });
            alert.present();
          }
        },{
          text: this.user.relation.photo != null ? 'Change' : 'Upload',
          icon: !this.platform.is('ios') ? 'ios-folder' : null,
          handler: () => {
            this.openFile();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  
  deletePhoto() {
    this.apiProvider.delete("user/delete-photo/" + localStorage.getItem("user_id"), {}, {"Content-Type": "application/json", "Authorizations": "Bearer " + localStorage.getItem("token")})
        .then((data) => {
          
          let result = JSON.parse(data.data);
          this.loading.dismiss();
          this.photo = this.defaultPhoto;
          this.helpersProvider.toastPresent(result.message);
          
        })
        .catch((error) => {
          let result = JSON.parse(error.data);
          this.loading.dismiss();
          if (result.status == '401') {
            this.events.publish("auth:forceLogout", result.message);
          }
          this.helpersProvider.toastPresent(result.message);
        });
      
  }

  goToAccount() {
    this.navCtrl.push("SettingPage");
  }

  presentNotifications(myEvent) {
    console.log(myEvent);
    let popover = this.popoverCtrl.create(NotificationsPage);
    popover.present({
      ev: myEvent
    });
  }

  getCountdown() {
    if (!this.wedding_day) {
      return;
    }
    
    let target_date = null;
    
    if(this.platform.is('ios')) {
      let t = this.wedding_day.split(/[- :]/);
      // Apply each element to the Date function
      target_date = new Date(t[0], t[1]-1, t[2], 0, 0, 0).getTime();
    } else {
      target_date = Date.parse(this.wedding_day + ' 00:00:00'); // set the countdown date
    }
    
    // find the amount of "seconds" between now and target
    let current_date = new Date().getTime();
    
    let seconds_left = (target_date - current_date) / 1000;
    
    if (current_date > target_date) {
      seconds_left = 0;
    }
    
    this.days = this.pad(Math.floor(seconds_left / 86400) );
    seconds_left = seconds_left % 86400;

    this.hours = this.pad(Math.floor(seconds_left / 3600) );
    seconds_left = seconds_left % 3600;

    this.minutes = this.pad(Math.floor(seconds_left / 60) );
    this.seconds = this.pad(Math.floor( seconds_left % 60 ) );
  }

  doUploadPhotoProfile() {
    let actionSheet = this.actionSheetCtrl.create({
      title: name,
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            
            let alert = this.alertCtrl.create({
              title: 'Anda yakin ingin menghapus foto ini?',
              buttons: [
                {
                  text: 'Tidak',
                  handler: () => {
                    console.log('Disagree clicked');
                  }
                },
                {
                  text: 'Ya',
                  handler: () => {
                    this.loading = this.helpersProvider.loadingPresent("");
                    this.deletePhotoProfile();
                  }
                }
              ]
            });
            alert.present();
          }
        },{
          text: this.user.relation.photo != null ? 'Change' : 'Upload',
          icon: !this.platform.is('ios') ? 'ios-folder' : null,
          handler: () => {
            this.openFileProfile();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  
  deletePhotoProfile() {
    this.apiProvider.delete("user/delete-photo-profile/" + localStorage.getItem("user_id"), {}, {"Content-Type": "application/json", "Authorizations": "Bearer " + localStorage.getItem("token")})
        .then((data) => {
          
          let result = JSON.parse(data.data);
          this.loading.dismiss();
          this.photoProfile = this.defaultPhotoProfile;
          this.helpersProvider.toastPresent(result.message);
          
        })
        .catch((error) => {
          let result = JSON.parse(error.data);
          this.loading.dismiss();
          if (result.status == '401') {
            this.events.publish("auth:forceLogout", result.message);
          }
          this.helpersProvider.toastPresent(result.message);
        });
  }

  openFileProfile() {
    this.camera.getPicture(this.openFileOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      
      this.loading = this.helpersProvider.loadingPresent("");
      
      let params = {
        "photo_base64": 'data:image/jpeg;base64,' + imageData
      }

      this.apiProvider.post("user/upload-photo-profile/" + localStorage.getItem("user_id"), params, {"Content-Type": "application/json", "Authorizations": "Bearer " + localStorage.getItem("token")})
        .then((data) => {
          
          let result = JSON.parse(data.data);
          
          this.loading.dismiss();
          
          this.photoProfile = this.photoProfileUrl + result.data.photo;
          
          this.helpersProvider.toastPresent(result.message);
          
        })
        .catch((error) => {
          let result = JSON.parse(error.data);
          
          this.loading.dismiss();
          if (result.status == '401') {
            this.events.publish("auth:forceLogout", result.message);
          }
          
          this.helpersProvider.toastPresent(result.message);
        });
      
    }, (err) => {
      // Handle error
        console.log(err);
    });
  }
}
