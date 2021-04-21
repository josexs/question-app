import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageProvider } from '@providers/ionic/storage.provider';
import { Gtag } from 'angular-gtag';

@Component({
  selector: 'app-home',
  templateUrl: 'home-menu.page.html',
  styleUrls: ['home-menu.page.scss'],
})
export class HomeMenuPage {
  routes = {
    route1: '/init-options',
    route2: '/init-options',
    route3: '/create',
    route4: '/credits',
  };
  continue = false;
  constructor(
    private gtag: Gtag,
    private router: Router,
    private storageProvider: StorageProvider
  ) {}

  async ionViewWillEnter(): Promise<void> {
    const shifts = await this.storageProvider.get('shifts');
    this.continue = shifts ? true : false;
  }

  async goTo(route: string) {
    switch (route) {
      case 'route1':
        await this.storageProvider.clear();
        this.gtag.event('start');
        break;
      case 'route2':
        this.gtag.event('continue');
        break;
      case 'route3':
        this.gtag.event('create');
        break;
      case 'route4':
        this.gtag.event('credits');
        break;
      default:
        break;
    }

    this.router.navigate([this.routes[route]]);
  }
}
