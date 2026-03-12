import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { star, arrowForward } from 'ionicons/icons';
import { Place } from '../models/place.model';
import { PlacesService } from '../services/places.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false
})
export class Tab1Page implements OnInit {
  places: Place[] = [];

  constructor(private placesService: PlacesService, private navCtrl: NavController) {
    addIcons({ star, arrowForward });
  }

  ngOnInit() {
    this.places = this.placesService.getAllPlaces();
  }

  goToDetail(id: string) {
    this.navCtrl.navigateForward(`/place-detail/${id}`);
  }
}
