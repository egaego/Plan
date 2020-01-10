import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { ApiProvider } from '../../providers/api/api';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

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
  vendorPackages : any = [];
  fileUrl: string;
  exceptionFileThumbUrl: string;
  loading: any;

  form: FormGroup;
  conceptId: AbstractControl;
  vendorId: AbstractControl;
  vendorPackageId: AbstractControl;
  date: AbstractControl;
  address: any;
  price: any;
  voucher: any;
  voucherDiscount: any;
  packageDescription: any;
  dateMin: any;
  dateMax: any;
  
  constructor(
    public navParams: NavParams, 
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public helpersProvider: HelpersProvider,
    private formBuilder: FormBuilder,
    public events: Events,
    public apiProvider: ApiProvider) {
      this.fileUrl = this.helpersProvider.getBaseUrl() + 'files/concepts/';
      this.exceptionFileThumbUrl = this.helpersProvider.getBaseUrl() + 'files/concepts/default.png';
      // this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
      this.loading = this.helpersProvider.loadingPresent("Please Wait ...");
      this.getData();

      this.form = this.formBuilder.group({
        conceptId: [this.conceptId, Validators.compose([Validators.required])],
        vendorId: [this.vendorId, Validators.compose([Validators.required])],
        vendorPackageId: [this.vendorPackageId, Validators.compose([Validators.required])],
        date: [this.date, Validators.compose([Validators.required])]
      });
      
      let d = new Date();
      
      let currentDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
      let maxDate = new Date(d.getFullYear() + 3, d.getMonth(), d.getDate(), 0, 0, 0);
      
      this.dateMin = currentDate.getFullYear();
      this.dateMax = maxDate.getFullYear();
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
          this.vendorPackages = item.vendor_packages;
          this.voucher = item.vendor_active_voucher;
          this.voucherDiscount = (this.voucher != null) ? this.voucher.discount : 0;
        }
    });
  }

  onVendorPackageFormChanged(event) {
    this.vendorPackages.map(item => {
        if (item.id == event) {
          this.packageDescription = item.description;
          this.price = item.price;
        }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormkonsepPage');
  }

  onSubmit(value:any) : void {
    this.loading = this.helpersProvider.loadingPresent("Please Wait ...");
    let params = {
      "user_id" : localStorage.getItem("user_id"),
      "concept_id" : value.conceptId,
      "vendor_id" : value.vendorId,
      "vendor_package_id" : value.vendorPackageId,
      "vendor_voucher_id" : (this.voucher == null) ? null : this.voucher.id,
      "price" : this.price,
      "discount" : this.voucherDiscount,
      "date" : value.date
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
  }

  dismiss(data: any) {
    this.viewCtrl.dismiss(data);
  }

}
