import { Component, ViewChild } from '@angular/core';
import { QuestionsProvider } from '@providers/api/questions.provider';
import { StorageProvider } from '@providers/ionic/storage.provider';
import { PopoverController } from '@ionic/angular';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { OptionsI } from '@interfaces/init-options.interface';
import { ParticipantI } from '@interfaces/participant.interface';
import { QuestionI } from '@interfaces/question.interface';
import { QuestionMenuComponent } from './components/menu-popover/question-menu.component';
import { Gtag } from 'angular-gtag';
import { Router } from '@angular/router';

@Component({
  selector: 'page-question',
  templateUrl: 'question.page.html',
})
export class QuestionPage {
  @ViewChild('slider') slides: any;
  @ViewChild('cdQuestion', { static: false }) public countdownQuestion: CountdownComponent;
  options: OptionsI;
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
    public popoverController: PopoverController,
    private gtag: Gtag,
    private router: Router
  ) {}

  async ionViewWillEnter(): Promise<void> {
    setTimeout(() => {
      if (this.slides) {
        this.slides.lockSwipes(true);
      }
    }, 500);
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
    this.options = await this.storageProvider.get<OptionsI>('options');
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
    // this.countdownQuestion.begin();

    // this.countdownQuestion.event.subscribe(() => {
    //   this.states.countdownQuestion = false;
    // });
    this.gtag.event('startQuestion');
    await this.countDown();
    this.states.countdownQuestion = false;
  }

  resetGame(): void {
    this.storageProvider.remove('options');
    this.gtag.event('resetGame');
    this.router.navigate(['/dashboard']);
  }

  endGame() {}

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

  async openPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: QuestionMenuComponent,
      event: ev,
      translucent: true,
      componentProps: { state: this.states.pause },
    });
    this.gtag.event('openPopover');
    await popover.present();
    const response = await popover.onDidDismiss();
    if (response.data && response.data.action) {
      const action = response.data.action;
      if (action === 'pause') {
      } else if (action === 'play') {
      } else if (action === 'reload') {
        this.resetGame();
      }
    }
  }

  countDown() {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
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
