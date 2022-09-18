import { Component, ViewChild } from '@angular/core';
import { QuestionsProvider } from 'app/shared/providers/api/questions.provider';
import { StorageProvider } from 'app/shared/providers/ionic/storage.provider';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { OptionsGameI } from '@interfaces/options-game.interface';
import { ParticipantI } from 'app/shared/interfaces/participant.interface';
import { QuestionI } from 'app/shared/interfaces/question.interface';
import { Gtag } from 'angular-gtag';
import { Router } from '@angular/router';

@Component({
  selector: 'page-question',
  templateUrl: 'question.page.html',
})
export class QuestionPage {
  @ViewChild('cdQuestion', { static: false }) public countdownQuestion: CountdownComponent;
  options: OptionsGameI;
  question: QuestionI;
  participant: ParticipantI;
  countdownQuestionConfig: CountdownConfig = {};
  isFirstQuestion: boolean;
  states = {
    buttonStart: true,
    countdownQuestion: true,
    question: true,
    pause: false,
    classification: false,
  };
  countdownCurrent = 0;
  countdownCurrentPercentage = '1';
  constructor(
    private questionsProvider: QuestionsProvider,
    private storageProvider: StorageProvider,
    private gtag: Gtag,
    private router: Router
  ) {}

  async ionViewWillEnter(): Promise<void> {
    await this.getOptions();
    this.resetSstates();
    await this.getRandomQuestion();
    await this.checkFirstQuestion();
    this.startFirstQuestion();
  }

  resetSstates() {
    this.states = {
      buttonStart: true,
      countdownQuestion: true,
      question: true,
      pause: false,
      classification: false,
    };
    this.countdownCurrent = Number(this.options.durationQuestion);
    this.countdownCurrentPercentage = '1';
  }

  async getOptions(): Promise<void> {
    this.options = await this.storageProvider.get<OptionsGameI>('options');
    if (this.options) {
      this.countdownQuestionConfig = {
        leftTime: Number(this.options.durationQuestion),
        format: 's',
        demand: true,
      };
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  async getRandomQuestion(): Promise<void> {
    this.participant = await this.storageProvider.get<ParticipantI>('currentShift');
    this.question = await this.questionsProvider.getRandomQuestion(this.options);
  }

  async checkFirstQuestion() {
    const isFirstQuestion = await this.storageProvider.get<boolean>('firstQuestion');
    if (isFirstQuestion !== null) {
      this.isFirstQuestion = isFirstQuestion;
    } else {
      this.isFirstQuestion = true;
    }
  }

  startFirstQuestion(): void {
    if (this.isFirstQuestion) {
      this.storageProvider.set('firstQuestion', false);
      this.isFirstQuestion = false;
      this.gtag.event('startFirstQuestion');
      this.startQuestion();
    }
  }

  async startQuestion(): Promise<void> {
    this.states.countdownQuestion = true;
    this.states.buttonStart = false;
    await this.questionsProvider.readQuestion(this.participant, this.question);
    this.gtag.event('startQuestion');
    await this.countDown();
    this.states.countdownQuestion = false;
  }

  resetGame(): void {
    this.storageProvider.remove('options');
    this.gtag.event('resetGame');
    this.router.navigate(['/dashboard']);
  }

  async voteQuestion(type: string): Promise<void> {
    this.participant = await this.questionsProvider.voteQuestion(type, this.participant);
    this.gtag.event('voteQuestion');
    this.states.question = false;
    // GOTO RESUME
    this.router.navigate(['/question-resume']);
    this.gtag.event('goToResume');
  }

  goToClassification(): void {
    this.gtag.event('goToClassification');
    this.states.classification = true;
  }

  goToResume() {
    this.gtag.event('goToResume');
    this.states.classification = false;
  }

  countDown() {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        console.log(this.countdownCurrent);
        this.countdownCurrent -= 1;
        this.countdownCurrentPercentage = (
          this.countdownCurrent / Number(this.options.durationQuestion)
        ).toFixed(2);
        if (this.countdownCurrent === 0) {
          clearInterval(interval);
          resolve(true);
        }
      }, 1000);
    });
  }
}
