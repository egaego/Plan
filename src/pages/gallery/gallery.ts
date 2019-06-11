import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {
  images: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.images = [
      // {
      //   "name": "apa",
      //   "img": 'https://img1.southernliving.timeinc.net/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/2017/06/main/autumn-charleston-wedding-jophoto-kn5a9998.jpg?itok=qx_rETsz',
      // },
      // {
      //   "name": "apa name",
      //   "img": 'https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2018/04/are-stylized-shoots-hurting-the-wedding-industry.jpg',
      // },
      // {
      //   "name": "apa name",
      //   "img": 'https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2018/04/are-stylized-shoots-hurting-the-wedding-industry.jpg',
      // },
      // {
      //   "name": "apa name",
      //   "img": 'https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2018/04/are-stylized-shoots-hurting-the-wedding-industry.jpg',
      // }

      'https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2018/04/are-stylized-shoots-hurting-the-wedding-industry.jpg',
      'http://brideandbreakfast.ph/wp-content/uploads/2015/01/Jim-and-Saab-Baguio-Wedding-002.jpg',
      'https://media.vanityfair.com/photos/5bdc59f97d738b4e26033e1a/master/w_768,c_limit/gwyneth-paltrow-brad-falchuk-wedding.jpg',
      'http://lindgrensbridal.com/wp-content/uploads/2018/02/d2405.jpg',
      'https://static1.squarespace.com/static/596bbf0ee3df283933d9dcb8/t/5b747a7c40ec9a6f4211d8eb/1534360198451/essense+of+australia+wedding+dress+in+destin+florida.jpg',
      'http://gio6v3sgme0lorck1bp74b12-wpengine.netdna-ssl.com/wp-content/uploads/2017/09/157_CP_GALLERY_TERIV.CO_.UK_-1020x679.jpg',
      'https://static1.squarespace.com/static/57310f632b8dded92ff49ec5/t/5b0f6f80758d464ac1ba42c0/1551064116547/MATT+%26+MEL+WEDDING-510.jpg?format=1500w',
      'https://amp.thisisinsider.com/images/5b4332bec8d6ed1c008b4574-750-563.jpg',
      'https://i.pinimg.com/originals/31/5b/89/315b896025e1da6a9fbaf95c836f1b4c.jpg',
    ];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GalleryPage');
  }

}
