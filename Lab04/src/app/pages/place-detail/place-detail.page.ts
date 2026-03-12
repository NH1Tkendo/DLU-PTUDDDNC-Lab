import { Component, OnInit, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import { star, locationOutline, calendarOutline } from 'ionicons/icons';
import { Place } from '../../models/place.model';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
  standalone: false
})
export class PlaceDetailPage implements OnInit {
  place!: Place;

  constructor(
    @Optional() private route: ActivatedRoute,
    private placesService: PlacesService
  ) {
    addIcons({ star, locationOutline, calendarOutline });
  }

  ngOnInit() {
    const id = this.route?.snapshot?.paramMap?.get('id');
    if (id) {
      this.place = this.placesService.getPlaceById(id)!;
    }
  }
}

