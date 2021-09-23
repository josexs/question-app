import { StorageProvider } from '@providers/ionic/storage.provider';
import { Component, ViewChild } from '@angular/core';
import { ParticipantI } from '@interfaces/participant.interface';
import { Router } from '@angular/router';
import { AlertProvider } from '@providers/ionic/alert.provider';
import { OptionsI } from '@interfaces/init-options.interface';

@Component({
  selector: 'classification',
  templateUrl: 'classification.page.html',
  styleUrls: ['./classification.page.scss'],
})
export class ClassificationPage {
  @ViewChild('slider') slides: any;
  shifts: ParticipantI[] = [];
  options: any[] = [];
  constructor(
    private storageProvider: StorageProvider,
    private router: Router,
    private alertProvider: AlertProvider
  ) {}

  async ionViewWillEnter(): Promise<void> {
    setTimeout(() => {
      if (this.slides) {
        this.slides.lockSwipes(true);
      }
    }, 500);
    const shifts = await this.storageProvider.get<ParticipantI[]>('shifts');
    this.getOptions();
    this.shifts = shifts.sort((a, b) => {
      if (a.positive - a.negative > b.positive - b.negative) {
        return -1;
      }
      if (a.positive - a.positive < b.positive - b.negative) {
        return 1;
      }
    });
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
    const gameOptions: OptionsI = await this.storageProvider.get('options');
    gameOptions.state = 'end';
    await this.storageProvider.set('options', gameOptions);
    this.router.navigate(['/end-game']);
  }
}
