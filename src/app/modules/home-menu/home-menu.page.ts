import { QuestionsProvider } from '@providers/api/questions.provider';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertProvider } from '@providers/ionic/alert.provider';
import { StorageProvider } from '@providers/ionic/storage.provider';
import { Gtag } from 'angular-gtag';
import { UtilsProvider } from '@providers/misc/utils.provider';

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
  totalQuestions = 0;
  totalBlock = false;
  literals = {
    title: '',
    subtitle: '',
  };
  constructor(
    private gtag: Gtag,
    private router: Router,
    private storageProvider: StorageProvider,
    private alertProvider: AlertProvider,
    private questionsProvider: QuestionsProvider,
    private utilsProvider: UtilsProvider
  ) {}

  async ionViewWillEnter(): Promise<void> {
    this.totalBlock = false;
    const shifts = await this.storageProvider.get('shifts');
    this.continue = shifts ? true : false;
    this.generateLiterals();
    this.getTotalCuestions();
    this.createItems();
  }

  getTotalCuestions() {
    this.questionsProvider.getAllQuestionsNumber().then(
      (response) => {
        this.totalQuestions = response.total;
        this.totalBlock = true;
      },
      () => (this.totalBlock = false)
    );
  }

  createItems() {
    this.items = [
      {
        title: 'Iniciar partida',
        subtitle: 'Aqui empieza todo...',
        action: 'start',
        color: 'ligh',
        state: true,
        event: 'start',
        route: '/init-options',
      },
      {
        title: 'Continuar',
        subtitle: '¿Continuamos donde lo dejamos?',
        action: 'continue',
        color: 'ligh',
        state: this.continue,
        event: 'continue',
        route: '/init-options',
      },
      {
        title: 'Enviar preguntas',
        subtitle: '¿Te atreves a enviarnos algo?',
        action: 'continue',
        color: 'ligh',
        state: true,
        event: 'sendQuestion',
        route: '/create',
      },
      {
        title: 'Autores de preguntas',
        subtitle: 'Aqui, los que han hecho esto posible',
        action: 'continue',
        color: 'ligh',
        state: true,
        event: 'credits',
        route: '/credits',
      },
    ];
  }

  async goTo(route: string, event: string) {
    if (event === 'start' && this.continue) {
      this.alertProvider.presentAlertWithButtons(
        '¡Oye!',
        'Tienes una partida en curso, ¿Quieres empezar una nueva?',
        [
          { text: 'No', role: 'cancel' },
          { text: 'Si', handler: () => this.confirmStart(event, route) },
        ],
        'alert-warning'
      );
    } else {
      this.gtag.event(event);
      this.router.navigate([route]);
    }
  }

  async confirmStart(event, route) {
    await this.storageProvider.clear();
    this.gtag.event(event);
    this.router.navigate([route]);
  }

  generateLiterals() {
    const title = ['¡Hola!', '¡Que pasa, bro!', 'Ola k ase', '¡Vamos!'];
    const subtitle = [
      'Vamos a darle un poco al asunto...',
      '¿Una partidita?',
      '¿Le damos al vicio?',
      '¿Estais preparados?',
      '¿Quereis fiesta?',
    ];

    this.literals.title = title[this.utilsProvider.randomNumber(title.length - 1, 0, false)];
    this.literals.subtitle =
      subtitle[this.utilsProvider.randomNumber(subtitle.length - 1, 0, false)];
  }
}
