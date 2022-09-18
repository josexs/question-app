import { Platform } from '@ionic/angular';
import { questionsMock } from './questions.mock';
import { Injectable } from '@angular/core';
import { ParticipantI } from 'app/shared/interfaces/participant.interface';
import { UtilsProvider } from 'app/shared/providers/misc/utils.provider';
import { QuestionI } from 'app/shared/interfaces/question.interface';
import { StorageProvider } from 'app/shared/providers/ionic/storage.provider';
import { OptionsGameI } from '@interfaces/options-game.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class QuestionsProvider {
  questions = [];
  shifts: ParticipantI[] = [];
  voicesSupported: SpeechSynthesisVoice[] = [];
  constructor(
    private utilsProvider: UtilsProvider,
    private storageProvider: StorageProvider,
    private platform: Platform,
    private httpClient: HttpClient
  ) {}

  async getAllQuestionsNumber(): Promise<{ total: number }> {
    const url = `${environment.path.api}/questions/getAllNumber`;
    return this.httpClient.get<{ total: number }>(url, {}).toPromise();
  }

  async getQuestions(): Promise<QuestionI[]> {
    return new Promise((resolve) => {
      const url = `${environment.path.api}/questions/getAll`;
      this.httpClient
        .get<QuestionI[]>(url, {})
        .toPromise()
        .then(
          (questions: QuestionI[]) => {
            this.questions = questions;
            resolve(this.questions);
          },
          () => {
            this.questions = questionsMock;
            resolve(this.questions);
          }
        );
    });
  }

  async getQuestionsSent(): Promise<QuestionI[]> {
    const url = `${environment.path.api}/questions/getSend`;
    return this.httpClient.get<QuestionI[]>(url, {}).toPromise();
  }

  async getAuthors(): Promise<any[]> {
    const url = `${environment.path.api}/questions/getAuthors`;
    return this.httpClient.get<any[]>(url, {}).toPromise();
  }

  async getRandomQuestion(options: OptionsGameI): Promise<QuestionI> {
    return new Promise(async (resolve, reject) => {
      try {
        if (this.questions.length === 0) {
          this.getQuestions().then(async () => {
            resolve(await this.getRandomQuestionWithQuestionsValues(options));
          });
        } else {
          resolve(await this.getRandomQuestionWithQuestionsValues(options));
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  async getRandomQuestionWithQuestionsValues(options) {
    const questions = this.questions.filter((item) => item.type.indexOf(options.type) !== -1);
    const randomNumber = this.utilsProvider.randomNumber(questions.length - 1, 0, false);
    const randomQuestion = questions[randomNumber];
    this.questions = questions.filter((_item, i) => i !== Number(randomNumber));
    await this.incrementCounterOfQuestion(randomQuestion._id);
    return randomQuestion;
  }

  getTotalOfQuestionOfType(type: string): number {
    if (type === 'all') {
      return this.questions.length;
    } else {
      return this.questions.filter((item: QuestionI) => item.type.indexOf(type) !== -1).length;
    }
  }

  incrementCounterOfQuestion(id: string): Promise<QuestionI> {
    const url = `${environment.path.api}/questions/incrementCounterOfQuestion/${id}`;
    return this.httpClient.put<QuestionI>(url, {}).toPromise();
  }

  //   initSpeech(): void {
  //     if (this.speech.hasBrowserSupport()) {
  //       const options = {
  //         volume: environment.sound ? 1 : 0.1,
  //         lang: 'es_ES',
  //         rate: 0.9,
  //         pitch: 1.5,
  //         splitSentences: true,
  //       };
  //     //   this.speech
  //     //     .init(options)
  //     //     .catch((e: any) => console.error('Error al iniciar speech: ', e));
  //     } else {
  //       console.error('speak-tts no soportado');
  //     }
  //   }

  setVoicesSupported(voices: any[]) {
    console.log(voices);
    for (const voice of voices) {
      this.voicesSupported.push(voice.name);
    }
  }

  readQuestion(participant: ParticipantI, question: QuestionI): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const msg = `Pregunta para ${participant.name}.......${question.text}`;
      const isiOS = this.platform.is('ios');
      console.log(participant.gender);
      this.getSupportedVoices();
      let rate = 0;
      if (participant.gender === 'male') {
          const nameFemale = isiOS ? 'Mónica' : 'Monica';
          rate = 1.1;
        // if (this.voicesSupported.indexOf(nameFemale) !== -1) {
        //   this.speech.setVoice(nameFemale);
        // } else {
        //   this.speech.setRate(1.3);
        //   this.speech.setVoice('español España');
        // }
      } else if (participant.gender === 'female') {
        // const nameMale = isiOS ? 'Mónica' : 'Jorge';
        // if (this.voicesSupported.indexOf(nameMale) !== -1) {
        //   this.speech.setVoice(nameMale);
        // } else {
        //   this.speech.setRate(1.2);
        //   this.speech.setVoice('español España');
        // }
          rate = 1.2;
      }
        await this.speak(msg, rate, this.utilsProvider.rand(2, true, 2));
        resolve();
    });
  }

  async voteQuestion(type: string, participant: ParticipantI): Promise<ParticipantI> {
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
    return this.changeToNextShift(participant);
  }

  changeToNextShift(participant: ParticipantI): ParticipantI {
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
    return currentShift;
  }

  async createAdminCuestion(item: QuestionI) {
    const url = `${environment.path.api}/questions/create`;
    const headers = await this.generateHeaders();
    return this.httpClient.post<QuestionI>(url, item, { headers }).toPromise();
  }

  async createUserCuestion(item: QuestionI) {
    const url = `${environment.path.api}/questions/sendApp`;
    return this.httpClient.post<QuestionI>(url, item).toPromise();
  }

  async updateQuestion(item: QuestionI) {
    const url = `${environment.path.api}/questions/update`;
    const headers = await this.generateHeaders();
    return this.httpClient.put<QuestionI>(url, item, { headers }).toPromise();
  }

  async deleteQuestion(id: string) {
    const url = `${environment.path.api}/questions/one/${id}`;
    const headers = await this.generateHeaders();
    return this.httpClient.delete<QuestionI>(url, { headers }).toPromise();
  }

  async generateHeaders(): Promise<HttpHeaders> {
    const token = await this.storageProvider.get<string>('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-token': token,
    });
    return headers;
  }

  async speak(text: string, rate: number, pitch: number) {
    await TextToSpeech.speak({
      text,
      lang: 'es-ES',
      rate,
      pitch,
      volume: 1.0,
      category: 'ambient',
    });
  }

  getSupportedVoices = async () => {
    const voices = await TextToSpeech.getSupportedVoices();
    console.log(voices);
  };
}
