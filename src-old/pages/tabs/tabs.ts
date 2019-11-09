import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  mySelectedIndex: any;

  tab1 = "KonsepPage";
  tab2 = "RincianPage";
  tab3 = "GalleryPage";
  tab4 = "SubvendorPage";
  tab5 = "ProfilPage";

 constructor(public navCtrl: NavController) {
  this.mySelectedIndex = 4;
}

}
