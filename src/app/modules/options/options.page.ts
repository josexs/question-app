import { Router } from '@angular/router';
import { QuestionsProvider } from '@providers/api/questions.provider';
import { Component } from '@angular/core';
import { AlertProvider } from '@providers/ionic/alert.provider';
import { StorageProvider } from '@providers/ionic/storage.provider';
import { OptionsI } from 'app/interfaces/init-options.interface';
import { ParticipantI } from '@interfaces/participant.interface';

@Component({
  selector: 'app-options',
  templateUrl: 'options.page.html',
})
export class InitOptionsPage {
  options: OptionsI = {
    numberParticipants: '2',
    type: 'normal',
    state: 'todo',
    durationQuestion: '15',
    participants: [],
  };
  shifts: ParticipantI[] = [];
  typesOfGame = [
    { name: 'Normal', value: 'normal' },
    { name: 'Fuerte', value: 'hard' },
  ];
  totalQuestions = 0;
  constructor(
    private alertProvider: AlertProvider,
    private storageProvider: StorageProvider,
    private questionsProvider: QuestionsProvider,
    private router: Router
  ) {}

  async ionViewWillEnter() {
    const options = await this.storageProvider.get<OptionsI>('options');
    if (options) {
      if (options.state === 'resume') {
        this.shifts = await this.storageProvider.get<ParticipantI[]>('shifts');
        this.options = options;
      } else if (options.state === 'inProgress') {
        this.router.navigate(['/question']);
      }
    } else {
      await this.questionsProvider.getQuestions();
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

  changeName(event: any) {
    const i = event.srcElement.id;
    this.options.participants[i].name = event.detail.value;
  }

  changeGender(event: any) {
    const i = event.srcElement.id;
    this.options.participants[i].gender = event.detail.value;
  }

  saveInitOptions(participants: ParticipantI[]): void {
    this.options.participants = participants;
    this.generateShifts();
    const validations = this.checkValidations();
    if (validations.state) {
      this.onSaveInitOptionsSuccess();
    } else {
      this.onSaveInitOptionsError(validations);
    }
  }

  onSaveInitOptionsSuccess() {
    this.storageProvider.set('options', this.options);
    this.router.navigate(['/options-resume']);
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

  resetGame() {
    this.storageProvider.remove('options');
    this.options = {
      numberParticipants: '2',
      type: 'hard',
      state: 'todo',
      durationQuestion: '15',
      participants: [],
    };
  }


  generateShifts() {
    this.shifts = this.options.participants.sort(() => Math.random() - 0.5);
    this.storageProvider.set('shifts', this.shifts);
  }

  goToAdmin() {
    
  }
}
