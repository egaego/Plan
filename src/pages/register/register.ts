import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, App, Events} from "ionic-angular";
import {LoginPage} from "../login/login";
//import {HomePage} from "../home/home";
import {TabsPage} from "../tabs/tabs";
import { FormBuilder, AbstractControl, FormGroup, Validators } from '@angular/forms';
import { Device } from '@ionic-native/device';
import { ApiProvider } from '../../providers/api/api';
import { HelpersProvider } from '../../providers/helpers/helpers';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  loading: any;

  registerForm: FormGroup;
  name: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;
  confirm_password: AbstractControl;

  constructor(
    public navCtrl: NavController,
		public api: ApiProvider,
		public navParams: NavParams,
		private device: Device,
    private events: Events,
    public app: App,
    private formBuilder: FormBuilder,
    private helpersProvider: HelpersProvider) {

      this.registerForm = this.formBuilder.group({
        name: ['', Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.compose([Validators.required])],
        confirm_password: ['', Validators.compose([Validators.required])],
      }, {validator: this.matchingPasswords('password', 'confirm_password')});
      
      if (localStorage.getItem("isLoggedIn") == "1") {
        this.navCtrl.setRoot("TabsPage");
      }
  }

  // register and go to home page
  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
  }

  onSubmit(value:any) : void {
    if (this.registerForm.valid) {
      this.loading = this.helpersProvider.loadingPresent("Please Wait ...");
      
      let params = {
        "name": value.name,
        "email": value.email,
        "password": value.password,
        "confirm_password": value.confirm_password,
        "firebase_token": localStorage.getItem("firebaseToken"), 
        "user_id_token": localStorage.getItem("userIdToken"), 
        "registered_device_number": this.device.uuid,
        "device_number": this.device.uuid
      };
      
      console.log(params);
      
      this.api.post('auth/register', params, {'Content-Type':'application/json'})
        .then((data) => {
          
          let result = JSON.parse(data.data);
          
          this.events.publish("auth:setLogin", {
            user: result
          });
          
          this.loading.dismiss();
          this.helpersProvider.toastPresent(result.message);
          
          this.app.getRootNav().setRoot("TabsPage");
        })
        .catch((error) => {
          this.loading.dismiss();
          console.log(error);
          
          let result = JSON.parse(error.error);
          
          this.helpersProvider.toastPresent(result.message);
        });
    }
  }

  // go to login page
  login() {
    this.navCtrl.push("LoginPage");
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
