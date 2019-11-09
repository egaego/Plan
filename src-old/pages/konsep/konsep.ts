import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController, ActionSheetController, AlertController } from 'ionic-angular';
import {FormkonsepPage} from "../formkonsep/formkonsep";
import { InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the KonsepPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-konsep',
  templateUrl: 'konsep.html',
})
export class KonsepPage {

  concepts : any = [];
  defaultConcepts : any = [];
  fileUrl: string;
  exceptionFileThumbUrl: string;
  loading: any;

  browserOptions: InAppBrowserOptions = {
    zoom: 'yes',
    toolbar: 'yes'
  }

  constructor(
    public navParams: NavParams, 
    public navCtrl: NavController,
    public helpersProvider: HelpersProvider,
    public modalCtrl: ModalController, 
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public events: Events,
    public apiProvider: ApiProvider) {
      this.fileUrl = this.helpersProvider.getBaseUrl() + 'files/concepts/';
      this.exceptionFileThumbUrl = this.helpersProvider.getBaseUrl() + 'files/concepts/default.png';
      // this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
      this.getData();
  }

  getData() {
    this.apiProvider.get('concept-detail/?token='+localStorage.getItem('token'), {}, {'Content-Type': 'application/json', 'Authorizations': 'Bearer ' + localStorage.getItem('token')})
      .then((data) => {
        let result = JSON.parse(data.data);
        
        this.concepts = result.data;
        this.defaultConcepts = result.data;

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

  addConcept() {
    let modal = this.modalCtrl.create("FormkonsepPage");
    modal.onDidDismiss((data) => {
      if (data != null) {
        this.concepts = data;
      }
    });
    modal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KonsepPage');
  }

  getFile(item) {
    let img = item.concept.file != null ? this.fileUrl + item.concept.file : this.exceptionFileThumbUrl;
    return "url("+img+")";
  }

  onPressed(e, id) {
    let actionSheet = this.actionSheetCtrl.create({
      title: name,
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            
            let alert = this.alertCtrl.create({
              title: 'Anda yakin ingin menghapus data ini?',
              message: '',
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
                    this.delete(id);
                  }
                }
              ]
            });
            alert.present();
          }
        }
      ]
    });
    actionSheet.present();
  }

  delete(id) {
    this.apiProvider.delete('concept-detail/delete/'+id+'?token='+localStorage.getItem('token'), {}, {'Content-Type': 'application/json', 'Authorizations': 'Bearer ' + localStorage.getItem('token')})
      .then((data) => {
        let result = JSON.parse(data.data);
        
        this.concepts = result.data;
        this.defaultConcepts = result.data;

        this.helpersProvider.toastPresent(result.message);

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
