import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Gtag } from 'angular-gtag';
import { MenuOptionsI } from '@interfaces';
import { AlertProvider, QuestionsProvider, StorageProvider } from '@providers';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.page.html',
})
export class DashboardPage {
  @ViewChild('slider') slides: any;
  totalQuestions: number;
  menuOptions: MenuOptionsI[] = [];
  constructor(
    private router: Router,
    private questionsProvider: QuestionsProvider,
    private storageProvider: StorageProvider,
    private alertProvider: AlertProvider,
    private gtag: Gtag
  ) {}

  async ionViewWillEnter(): Promise<void> {
    this.lockSwipes();
    this.getMenuOptions();
    await this.questionsProvider.getQuestions();
    this.getTotalOfQuestionOfType();
  }

  lockSwipes() {
    setTimeout(() => {
      if (this.slides) {
        this.slides.lockSwipes(true);
      }
    }, 500);
  }

  async getMenuOptions(): Promise<void> {
    const continueDisabled = await this.storageProvider.get('options');
    this.menuOptions = [
      {
        name: 'Iniciar partida',
        action: 'start',
        disabled: false,
      },
      {
        name: 'Continuar',
        action: 'continue',
        disabled: continueDisabled ? false : true,
      },
      {
        name: 'Enviar preguntas',
        action: 'send',
        disabled: false,
      },
      {
        name: 'Autores del juego',
        action: 'authors',
        disabled: false,
      },
    ];
  }

  actionButton(action: string) {
    switch (action) {
      case 'start':
        this.start();
        break;
      case 'continue':
        this.router.navigate(['/question']);
        break;
      case 'send':
        this.router.navigate(['/create']);
        break;
      case 'authors':
        this.router.navigate(['/credits']);
        break;

      default:
        break;
    }
  }

  async start() {
    const continueDisabled = await this.storageProvider.get('options');
    if (continueDisabled !== null) {
      this.alertProvider.presentAlertWithButtons(
        '¡Oye!',
        'Tienes una partida en curso, ¿Quieres empezar una nueva?',
        [
          { text: 'No', role: 'cancel' },
          { text: 'Si', handler: () => this.confirmStart() },
        ],
        'alert-warning'
      );
    } else {
      this.confirmStart();
    }
  }

  async confirmStart() {
    this.storageProvider.clear();
    this.gtag.event('goToInitOptions');
    this.router.navigate(['/options']);
  }

  getTotalOfQuestionOfType(): void {
    this.totalQuestions =
      this.questionsProvider.getTotalOfQuestionOfType('all');
  }

  goToAdmin() {
    this.gtag.event('goToAdmin');
    this.router.navigate(['/login']);
  }
}
