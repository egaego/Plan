import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KonsepPage } from './konsep';

@NgModule({
  declarations: [
    KonsepPage,
  ],
  imports: [
    IonicPageModule.forChild(KonsepPage),
  ],
})
export class KonsepPageModule {}
