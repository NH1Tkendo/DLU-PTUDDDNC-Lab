import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { register } from 'swiper/element/bundle';

import { PlaceDetailPage } from './place-detail.page';

register();

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: PlaceDetailPage }])
  ],
  declarations: [PlaceDetailPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlaceDetailModule {}
