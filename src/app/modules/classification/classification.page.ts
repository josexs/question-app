import { Component } from '@angular/core';
import { AlertProvider, StorageProvider } from '@providers';
import { ParticipantI, OptionsGameI } from '@interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'classification',
  templateUrl: 'classification.page.html',
  styleUrls: ['./classification.page.scss'],
})
export class ClassificationPage {
  shifts: ParticipantI[] = [];
  options: any[] = [];
  constructor(
    private storageProvider: StorageProvider,
    private router: Router,
    private alertProvider: AlertProvider
  ) {}

  async ionViewWillEnter(): Promise<void> {
    const shifts = await this.storageProvider.get<ParticipantI[]>('shifts');
    this.getOptions();
    shifts.sort((a, b) => {
      if (a.positive - a.negative > b.positive - b.negative) {
        return -1;
      }
      if (a.positive - a.negative < b.positive - b.negative) {
        return 1;
      }
    });
    this.shifts = shifts;
  }

  getOptions() {
    this.options = [
      {
        name: 'Volver',
        action: 'continue',
      },
      {
        name: 'Terminar partida',
        action: 'end',
      },
    ];
  }

  actionButton(action: string) {
    switch (action) {
      case 'continue':
        this.goToResume();
        break;
      case 'end':
        this.endGame();
        break;
      default:
        break;
    }
  }

  goToResume() {
    this.router.navigate(['/question-resume']);
  }

  endGame() {
    this.alertProvider.presentAlertWithButtons(
      '¿Estas seguro?',
      '¿Quieres terminar el juego?',
      [
        { text: 'No', role: 'cancel' },
        { text: 'Si', handler: () => this.goToEndConfirm() },
      ],
      'alert-warning'
    );
  }

  async goToEndConfirm() {
    const gameOptions: OptionsGameI = await this.storageProvider.get('options');
    gameOptions.state = 'end';
    await this.storageProvider.set('options', gameOptions);
    this.router.navigate(['/end-game']);
  }
}
