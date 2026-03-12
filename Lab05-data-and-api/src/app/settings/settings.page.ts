import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
  standalone: false,
})
export class SettingsPage implements OnInit {
  currentName: string = '';
  nameInput: string = '';

  constructor(private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();
  }

  async saveName(name: string) {
    await this.storage.set('username', name);
    this.currentName = name;
  }

  async getName() {
    this.currentName = await this.storage.get('username');
  }
}
