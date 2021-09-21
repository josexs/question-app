import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsProvider } from '@providers/api/questions.provider';
import { AlertProvider } from '@providers/ionic/alert.provider';
import { StorageProvider } from '@providers/ionic/storage.provider';
import { Gtag } from 'angular-gtag';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
  totalQuestions: number;
  menuOptions: { name: string; action: string; disabled: boolean }[] = [];
  constructor(
    private router: Router,
    private questionsProvider: QuestionsProvider,
    private storageProvider: StorageProvider,
    private alertProvider: AlertProvider,
    private gtag: Gtag
  ) {}

  async ionViewWillEnter(): Promise<void> {
    this.getMenuOptions();
    await this.questionsProvider.getQuestions();
    this.getTotalOfQuestionOfType();
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
    await this.storageProvider.clear();
    this.gtag.event('goToInitOptions');
    this.router.navigate(['/options']);
  }

  getTotalOfQuestionOfType(): void {
    this.totalQuestions = this.questionsProvider.getTotalOfQuestionOfType('all');
  }

  goToAdmin() {
    this.gtag.event('goToAdmin');
    this.router.navigate(['/login']);
  }
}
