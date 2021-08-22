import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsProvider } from '@providers/api/questions.provider';
import { StorageProvider } from '@providers/ionic/storage.provider';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  totalQuestions: number;
  menuOptions: { name: string; action: string; disabled: boolean }[] = [];
  constructor(
    private router: Router,
    private questionsProvider: QuestionsProvider,
    private storageProvider: StorageProvider
  ) {}

  ngOnInit(): void {
    this.getMenuOptions();
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
        disabled: continueDisabled ? true : false,
      },
      {
        name: 'Enviar preguntas',
        action: 'send',
        disabled: false
      },
      {
        name: 'Authores del juego',
        action: 'authors',
        disabled: false
      },
    ];
  }

  actionButton(action: string) {
    switch (action) {
      case 'start':
        this.router.navigate(['/options']);
        break;
      case 'continue':
        break;
      case 'send':
        break;
      case 'authors':
        break;

      default:
        break;
    }
  }

  getTotalOfQuestionOfType(): void {
    this.totalQuestions = this.questionsProvider.getTotalOfQuestionOfType('all');
  }
}
