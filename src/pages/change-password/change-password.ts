import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Events} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ApiProvider } from '../../providers/api/api';
import { HelpersProvider } from '../../providers/helpers/helpers';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  loading: any;
  editProfileForm: FormGroup;
  current_password: AbstractControl;
  password: AbstractControl;
  confirm_password: AbstractControl;

  user:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public helpersProvider: HelpersProvider,
    public apiProvider: ApiProvider,
    private formBuilder: FormBuilder,
    private events: Events
  ) {
    
    this.events.publish("auth:checkLogin");
    
    this.editProfileForm = this.formBuilder.group({
        current_password: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.required])],
        confirm_password: ['', Validators.compose([Validators.required])],
      }, {validator: this.matchingPasswords('password', 'confirm_password')});
  }
  
  onSubmit(value:any) : void {
    if (this.editProfileForm.valid) {
      this.loading = this.helpersProvider.loadingPresent("Please Wait ...");
      
      let params = {
        "current_password": value.current_password,
        "password": value.password,
        "confirm_password": value.confirm_password
      };
      
      this.apiProvider.post('user/change-password', params, {'Content-Type': 'application/json', 'Authorizations': 'Bearer ' + localStorage.getItem("token")})
        .then((data) => {
          
          let result = JSON.parse(data.data);
          
          this.loading.dismiss();
          this.helpersProvider.toastPresent(result.message);
          
          this.navCtrl.setRoot("ProfilPage");
        })
        .catch((error) => {
          this.loading.dismiss();
          let result = JSON.parse(error.error);
          if (result.status == '401') {
            this.events.publish("auth:forceLogout", result.message);
          }
          this.helpersProvider.toastPresent(result.message);
          console.log(result);
        });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

}

