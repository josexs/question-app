import { OptionsGameI } from '@interfaces/options-game.interface';
import { StorageProvider } from 'app/shared/providers/ionic/storage.provider';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ParticipantI } from 'app/shared/interfaces/participant.interface';
import { Gtag } from 'angular-gtag';
import { Router } from '@angular/router';
import { AlertProvider } from 'app/shared/providers/ionic/alert.provider';

@Component({
  selector: 'question-resume',
  templateUrl: 'question-resume.page.html',
  styleUrls: ['./question-resume.page.scss'],
})
export class QuestionResumePage {
  @ViewChild('slider') slides: any;
  currentShift: ParticipantI;
  shifts: ParticipantI[] = [];
  state = false;
  position = null;
  options = [];
  constructor(
    private storageProvider: StorageProvider,
    private gtag: Gtag,
    private router: Router,
    private alertProvider: AlertProvider
  ) {}

  async ionViewWillEnter(): Promise<void> {
    setTimeout(() => {
      if (this.slides) {
        this.slides.lockSwipes(true);
      }
    }, 500);
    await this.getCurrentShift();
    this.getStats();
    this.getOptions();
  }

  getOptions() {
    this.options = [
      {
        name: 'Clasificacion',
        action: 'classification',
      },
      {
        name: 'Continuar',
        action: 'continue',
      },
      {
        name: 'Terminar partida',
        action: 'end',
      },
    ];
  }

  async getCurrentShift() {
    this.currentShift = await this.storageProvider.get('currentShift');
  }

  async getStats() {
    try {
      this.shifts = await this.storageProvider.get('shifts');
      this.shifts.sort((a, b) => {
        if (a.positive - a.negative > b.positive - b.negative) {
          return -1;
        }
        if (a.positive - a.negative < b.positive - b.negative) {
          return 1;
        }
      });
      this.shifts.forEach((item, i) => {
        if (item.name === (this.currentShift && this.currentShift.name)) {
          this.position = i;
        }
      });

      this.state = true;
    } catch (error) {
      console.error(error);
    }
  }

  actionButton(action: string) {
    switch (action) {
      case 'classification':
        this.goToClassification();
        break;
      case 'continue':
        this.nextQuestion();
        break;
      case 'end':
        this.endGame();
        break;
      default:
        break;
    }
  }

  goToClassification() {
    this.gtag.event('goToClassification');
    this.router.navigate(['/classification']);
  }

  nextQuestion(): void {
    this.gtag.event('nextQuestion');
    this.router.navigate(['/question']);
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
