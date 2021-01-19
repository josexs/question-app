import { QuestionsProvider } from '@providers/api/questions.provider';
import { UtilsProvider } from '@providers/utils.provider';
import { Component } from '@angular/core';
import { AlertProvider } from '@providers/ionic/alert.provider';
import { StorageProvider } from '@providers/ionic/storage.provider';
import { OptionsI } from 'app/interfaces/init-options.interface';
import { NavController } from '@ionic/angular';
import { ParticipantI } from '@interfaces/participant.interface';

@Component({
  selector: 'app-init-options',
  templateUrl: 'init-options.page.html',
})
export class InitOptionsPage {
  options: OptionsI = {
    numberParticipants: '2',
    type: 'normal',
    state: 'todo',
    durationGame: '30',
    durationQuestion: '15',
    participants: [],
  };
  shifts: ParticipantI[] = [];
  typesOfGame = [
    { name: 'Suave', value: 'light' },
    { name: 'Normal', value: 'normal' },
    { name: 'Fuerte', value: 'hard' },
  ];
  totalQuestions = 0;
  constructor(
    private alertProvider: AlertProvider,
    private storageProvider: StorageProvider,
    private navCtrl: NavController,
    private questionsProvider: QuestionsProvider
  ) {}

  async ionViewWillEnter() {
    const options = await this.storageProvider.get<OptionsI>('options');
    if (options) {
      if (options.state === 'resume') {
        this.shifts = await this.storageProvider.get<ParticipantI[]>('shifts');
        this.options = options;
      } else if (options.state === 'inProgress') {
        this.navCtrl.navigateForward(['/question']);
      }
    } else {
      this.getTotalOfQuestionOfType();
    }
  }

  getTotalOfQuestionOfType() {
    this.totalQuestions = this.questionsProvider.getTotalOfQuestionOfType(this.options.type);
  }

  changeNumberOfParticipants() {
    const participant: ParticipantI = { name: '', gender: '', photo: '', positive: 0, negative: 0 };
    this.options.participants = [];
    for (let i = 0; i < Number(this.options.numberParticipants); i++) {
      this.options.participants.push(participant);
    }
  }

  changeName(event: any, i: number) {
    this.options.participants[i].name = event.detail.value;
  }

  changeGender(event: any, i: number) {
    this.options.participants[i].gender = event.detail.value;
  }

  saveInitOptions(): void {
    const validations = this.checkValidations();
    if (validations.state) {
      this.onSaveInitOptionsSuccess();
    } else {
      this.onSaveInitOptionsError(validations);
    }
  }

  onSaveInitOptionsSuccess() {
    this.options.state = 'resume';
    this.storageProvider.set('options', this.options);
  }

  onSaveInitOptionsError(validations: { message: string; state: boolean }) {
    this.alertProvider.presentAlert('¡Oye!', validations.message);
  }

  checkValidations() {
    const validation = {
      message: '',
      state: true,
    };

    if (this.options.type === '') {
      return { message: 'Tienes que seleccionar el tipo de juego', state: false };
    }

    for (let i = 0; i < this.options.participants.length; i++) {
      const participant = this.options.participants[i];
      if (participant.name === '') {
        return { message: `El participante numero ${i + 1} tiene que tener nombre`, state: false };
      }
      if (participant.gender === '') {
        return { message: `El participante numero ${i + 1} tiene que tener genero`, state: false };
      }
    }

    return validation;
  }

  simulateOptions() {
    this.options = {
      numberParticipants: '2',
      type: 'hard',
      state: 'resume',
      durationGame: '30',
      durationQuestion: '1',
      participants: [
        { name: 'Jose', gender: 'male', photo: '', positive: 0, negative: 0 },
        { name: 'Black', gender: 'male', photo: '', positive: 0, negative: 0 },
        { name: 'Manola', gender: 'female', photo: '', positive: 0, negative: 0 },
        { name: 'Eustaquia', gender: 'female', photo: '', positive: 0, negative: 0 },
      ],
    };
    this.generateShifts();
    this.saveInitOptions();
  }

  resetGame() {
    this.storageProvider.remove('options');
    this.options = {
      numberParticipants: '2',
      type: 'hard',
      state: 'todo',
      durationGame: '30',
      durationQuestion: '15',
      participants: [],
    };
  }

  startGame() {
    this.options.state = 'inProgress';
    this.storageProvider.set('options', this.options);
    this.storageProvider.set('currentShift', this.shifts[0]);
    this.storageProvider.set('firstQuestion', true);
    this.navCtrl.navigateForward(['question']);
  }

  generateShifts() {
    this.shifts = this.options.participants.sort(() => Math.random() - 0.5);
    this.storageProvider.set('shifts', this.shifts);
  }
}
