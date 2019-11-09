import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ApiProvider } from '../../providers/api/api';
import { HelpersProvider } from '../../providers/helpers/helpers';

/**
 * Generated class for the RelationProfileDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-relation-profile-detail',
  templateUrl: 'relation-profile-detail.html',
})
export class RelationProfileDetailPage {
  
  loading: any;
  relationProfileForm: FormGroup;
  name: AbstractControl;
  email: AbstractControl;
  
  user: any;
  relation: any;
  userName: any = '';
  userEmail: any = '';
  isFormRelation: any = false;
  isRelationDetail: any = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public helpersProvider: HelpersProvider,
    public apiProvider: ApiProvider,
    private formBuilder: FormBuilder,
    private events: Events
  ) {
    
    this.events.publish("auth:checkLogin");
    
    this.getUser();
    this.relationProfileForm = this.formBuilder.group({
      name: [this.userName, Validators.compose([Validators.required])],
      email: [this.userEmail, Validators.compose([Validators.required, Validators.email])]
    });
  }
  
  getUser() {
    this.loading = this.helpersProvider.loadingPresent("Please Wait ...");
    this.apiProvider.get('user/show/' + localStorage.getItem('user_id'), {}, {'Content-Type': 'application/json', "Authorizations": "Bearer " + localStorage.getItem('token')})
      .then((data) => {
        this.user = JSON.parse(data.data).data;
        this.relation = this.user.relation.partner;
        this.userName = this.relation.name;
        this.userEmail = this.relation.email;
        console.log(this.relation);
        if (this.relation.name == null) {
          this.isFormRelation = true;
          this.isRelationDetail = false;
        } else {
          this.isFormRelation = true;
          this.isRelationDetail = false;
        }
        this.loading.dismiss();
        this.relationProfileForm = this.formBuilder.group({
          name: [this.userName, Validators.compose([Validators.required])],
          email: [this.userEmail, Validators.compose([Validators.required, Validators.email])]
        });
      })
      .catch((error) => {
        this.loading.dismiss();
        this.user = [];
        this.relation = [];
        let result = JSON.parse(error.error);
        if (result.status == '401') {
          this.events.publish("auth:forceLogout", result.message);
        }
        this.helpersProvider.toastPresent(result.message);
        console.log(error);
      });
  }
  
  onSubmit(value:any) : void {
    if (this.relationProfileForm.valid) {
      this.loading = this.helpersProvider.loadingPresent("Please Wait ...");
      
      let params = {
        "name": value.name,
        "email": value.email,
      };
      
      this.apiProvider.patch('user/re-send-relation/' + localStorage.getItem("user_id"), params, {'Content-Type': 'application/json', 'Authorizations': 'Bearer ' + localStorage.getItem("token")})
        .then((data) => {
          
          let result = JSON.parse(data.data);
          
          this.loading.dismiss();
          this.helpersProvider.toastPresent(result.message);
          this.navCtrl.setRoot("ProfilPage");
        })
        .catch((error) => {
          this.loading.dismiss();
          console.log(error);
          
          let result = JSON.parse(error.error);
          if (result.status == '401') {
            this.events.publish("auth:forceLogout", result.message);
          }
          this.helpersProvider.toastPresent(result.message);
        });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RelationProfileDetailPage');
  }

}
