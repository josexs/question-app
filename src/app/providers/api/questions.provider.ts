import { questionsMock } from './questions.mock';
import { Injectable } from '@angular/core';
import { ParticipantI } from '@interfaces/participant.interface';
import { UtilsProvider } from '@providers/utils.provider';
import { QuestionI } from '@interfaces/question.interface';
import { StorageProvider } from '@providers/ionic/storage.provider';
import Speech from 'speak-tts';
import { OptionsI } from '@interfaces/init-options.interface';

@Injectable({ providedIn: 'root' })
export class QuestionsProvider {
  questions = questionsMock;
  shifts: ParticipantI[] = [];
  speech = new Speech();
  constructor(private utilsProvider: UtilsProvider, private storageProvider: StorageProvider) {
    this.initSpeech();
  }

  getRandomQuestion(options: OptionsI) {
    const questions = this.questions.filter((item) => item.type.indexOf(options.type) !== -1);
    const randomNumber = this.utilsProvider.randomNumber(questions.length - 1, 0, false);
    const randomQuestion = questions[randomNumber];
    return randomQuestion;
  }

  getTotalOfQuestionOfType(type: string): number {
    return this.questions.filter((item: QuestionI) => item.type.indexOf(type) !== -1).length;
  }

  initSpeech() {
    this.speech
      .init({
        volume: 1,
        lang: 'es-ES',
        rate: 1,
        pitch: 1,
      })
      .catch((e: any) => console.error('Error al iniciar speech: ', e));
  }

  readQuestion(participant: ParticipantI, question: QuestionI): Promise<void> {
    return new Promise((resolve, reject) => {
      const msg = `Pregunta para ${participant.name}.......${question.text}`;
      this.speech
        .speak({
          text: msg,
          queue: false,
          listeners: {
            onend: () => {},
          },
        })
        .then(() => resolve())
        .catch((e: any) => reject(e));
    });
  }

  async voteQuestion(type: string, participant: ParticipantI) {
    this.shifts = await this.storageProvider.get<ParticipantI[]>('shifts');
    for (const shift of this.shifts) {
      if (shift.name === participant.name) {
        if (type === 'positive') {
          shift.positive += 1;
        } else if (type === 'negative') {
          shift.negative += 1;
        }
      }
    }
    this.storageProvider.set('shifts', this.shifts);
    this.changeToNextShift(participant);
  }

  changeToNextShift(participant: ParticipantI) {
    let currentShift: ParticipantI;
    for (let i = 0; i < this.shifts.length; i++) {
      const shift = this.shifts[i];
      if (participant.name === shift.name) {
        if (i < this.shifts.length - 1) {
          currentShift = this.shifts[i + 1];
        } else {
          currentShift = this.shifts[0];
        }
      }
    }
    this.storageProvider.set('currentShift', currentShift);
    console.log(currentShift);
  }
}
