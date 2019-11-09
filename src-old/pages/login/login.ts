import {Component} from "@angular/core";
import {IonicPage, NavController, AlertController, ToastController, MenuController, NavParams, Events, App} from "ionic-angular";
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {ApiProvider} from '../../providers/api/api';
import {HelpersProvider} from '../../providers/helpers/helpers';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loading: any;

  loginForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  
  loginErrors: any;
  loginError: any;

  constructor(
    public navCtrl: NavController, 
    public forgotCtrl: AlertController, 
    public menu: MenuController, 
    public toastCtrl: ToastController,
		public api: ApiProvider,
		public navParams: NavParams,
    private helpersProvider: HelpersProvider,
    public app: App,
		private events: Events,
    private formBuilder: FormBuilder) {
    
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    });
    
    if (localStorage.getItem("isLoggedIn") == "1") {
      this.navCtrl.setRoot("TabsPage");
    }

    this.menu.swipeEnable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  // go to register page
  register() {
    this.navCtrl.push("RegisterPage");
  }

  onSubmit(value:any) : void {
    if (this.loginForm.valid) {
      this.loading = this.helpersProvider.loadingPresent("Authenticating ...");

      let params = {
        "email": value.email, 
        "password": value.password, 
        "firebase_token": localStorage.getItem("firebaseToken"), 
        "user_id_token": localStorage.getItem("userIdToken"), 
        "device_number": "xxx"
      };

      console.log(params);
      
      this.api.post('auth/login', params, {'Content-Type':'application/json'})
        .then((data) => {
          
          let result = JSON.parse(data.data);
          
          this.events.publish("auth:setLogin", {
            user: result,
            isLoggedIn: true
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

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            if (data.email == "") {
              let toast = this.toastCtrl.create({
                message: 'Email is required',
                duration: 3000,
                position: 'bottom',
                cssClass: 'dark-trans',
                closeButtonText: 'Ok',
                showCloseButton: true,
              });
              toast.onDidDismiss(() => {
                this.forgotPass();
                  ///undo operation
              });
              toast.present();
              return;
            }
            
            this.onProcessForgotPassword(data);
            
          }
        }
      ]
    });
    forgot.present();
  }

  onProcessForgotPassword(data: any) {
    this.loading = this.helpersProvider.loadingPresent("Please Wait ...");
      
    this.api.post('auth/forgot-password', data, {'Content-Type':'application/json'})
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

}
