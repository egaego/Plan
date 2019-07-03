import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController, AlertController, Events } from 'ionic-angular';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { ApiProvider } from '../../providers/api/api';
import { EmailComposer } from '@ionic-native/email-composer';

/**
 * Generated class for the RincianPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rincian',
  templateUrl: 'rincian.html',
})
export class RincianPage {

  concepts : any = [];
  defaultConcepts : any = [];
  fileUrl: string;
  exceptionFileThumbUrl: string;
  loading: any;
  total: any = 0;

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public helpersProvider: HelpersProvider,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    private emailComposer: EmailComposer,
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
        this.total = result.total;

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

  print() {
    this.helpersProvider.screenshot.save('jpg', 80, 'myscreenshot.jpg').then(response => {
      //this.helpersProvider.socialSharing.share("PlanYourDays.id Rincian Biaya", "PlanYourDays.id Rincian Biaya", response.filePath);

    let email = {
    //to: 'ega281291@gmail.com',
    attachments: [
    response.filePath
    ],

    subject: 'test email',
    body: 'hay cool',
    isHtml: true
    };

    this.emailComposer.open(email);
    },
    error => {

    });
  }
}
