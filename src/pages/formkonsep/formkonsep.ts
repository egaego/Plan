import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { ApiProvider } from '../../providers/api/api';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the FormkonsepPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-formkonsep',
  templateUrl: 'formkonsep.html',
})
export class FormkonsepPage {

  concepts : any = [];
  vendors : any = [];
  fileUrl: string;
  exceptionFileThumbUrl: string;
  loading: any;

  konsepForm: any;
  vendorForm: any;
  address: any;
  price: any;
  
  constructor(
    public navParams: NavParams, 
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public helpersProvider: HelpersProvider,
    public events: Events,
    public apiProvider: ApiProvider) {
      this.fileUrl = this.helpersProvider.getBaseUrl() + 'files/concepts/';
      this.exceptionFileThumbUrl = this.helpersProvider.getBaseUrl() + 'files/concepts/default.png';
      // this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
      this.loading = this.helpersProvider.loadingPresent("Please Wait ...");
      this.getData();
  }

  getData() {
    this.apiProvider.get('concepts/list-concepts?token='+localStorage.getItem('token'), {}, {'Content-Type': 'application/json', 'Authorizations': 'Bearer ' + localStorage.getItem('token')})
      .then((data) => {
        let result = JSON.parse(data.data);
        
        this.concepts = result.data;
        this.loading.dismiss();

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

  onKonsepFormChanged(event) {
    this.concepts.map(item => {
        if (item.id == event) {
          this.vendors = item.vendors;
        }
    });
  }

  onVendorFormChanged(event) {
    this.vendors.map(item => {
        if (item.id == event) {
          this.address = item.address;
          this.price = item.price;
        }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormkonsepPage');
  }

  onSubmit() {
    this.loading = this.helpersProvider.loadingPresent("Please Wait ...");
    let params = {
      "user_id" : localStorage.getItem("user_id"),
      "concept_id" : this.konsepForm,
      "vendor_id" : this.vendorForm
    }

    this.apiProvider.post('concept-detail/store', params, {'Content-Type':'application/json', "Authorizations": "Bearer " + localStorage.getItem("token")})
        .then((data) => {        
          let result = JSON.parse(data.data);
          
          this.loading.dismiss();
          this.helpersProvider.toastPresent(result.message);
          this.dismiss(result.data);
        })
        .catch((error) => {
          this.loading.dismiss();
          console.log(error);
          let result = JSON.parse(error.error);
          this.helpersProvider.toastPresent(result.message);
        });

    this.loading.dismiss();
  }

  dismiss(data: any) {
    this.viewCtrl.dismiss(data);
  }

}
