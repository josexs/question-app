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
  items = [];
  continue = false;
  constructor(
    private gtag: Gtag,
    private router: Router,
    private storageProvider: StorageProvider
  ) {}

  async ionViewWillEnter(): Promise<void> {
    const shifts = await this.storageProvider.get('shifts');
    this.continue = shifts ? true : false;
    console.log(this.continue);
    this.createItems();
  }

  createItems() {
    this.items = [
      {
        title: 'Iniciar partida',
        subtitle: 'Aqui empieza todo...',
        action: 'start',
        color: 'dark',
        state: true,
        event: 'start',
        route: '/init-options',
      },
      {
        title: 'Continuar',
        subtitle: '¿Continuamos donde lo dejamos?',
        action: 'continue',
        color: 'dark',
        state: this.continue,
        event: 'continue',
        route: '/init-options',
      },
      {
        title: 'Enviar preguntas',
        subtitle: '¿Te atreves a enviarnos algo?',
        action: 'continue',
        color: 'dark',
        state: true,
        event: 'sendQuestion',
        route: '/create',
      },
      {
        title: 'Autores de preguntas',
        subtitle: 'Aqui, los que han hecho esto posible',
        action: 'continue',
        color: 'dark',
        state: true,
        event: 'credits',
        route: '/credits',
      },
    ];
  }

  async goTo(route: string, event: string) {
    if (event === 'start') {
      await this.storageProvider.clear();
    }
    this.gtag.event(event);
    this.router.navigate([route]);
  }
}
