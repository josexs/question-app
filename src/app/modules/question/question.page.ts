import { AlertProvider } from '@providers/ionic/alert.provider';
import { Component, ViewChild } from '@angular/core';
import { QuestionsProvider } from '@providers/api/questions.provider';
import { StorageProvider } from '@providers/ionic/storage.provider';
import { NavController, PopoverController } from '@ionic/angular';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { OptionsI } from '@interfaces/init-options.interface';
import { ParticipantI } from '@interfaces/participant.interface';
import { QuestionI } from '@interfaces/question.interface';
import { QuestionMenuComponent } from './components/menu-popover/question-menu.component';

@Component({
  selector: 'page-question',
  templateUrl: 'question.page.html',
})
export class QuestionPage {
  @ViewChild('cdQuestion', { static: false }) private countdownQuestion: CountdownComponent;
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
    classification: false
  };
  constructor(
    private questionsProvider: QuestionsProvider,
    private storageProvider: StorageProvider,
    private navCtrl: NavController,
    private alertProvider: AlertProvider,
    public popoverController: PopoverController,
  ) {}

  async ionViewWillEnter(): Promise<void> {
    this.states.buttonStart = true;
    await this.getOptions();
    await this.getRandomQuestion();
    await this.checkFirstQuestion();
    this.startFirstQuestion();
  }

  async getOptions(): Promise<void> {
    this.options = await this.storageProvider.get<OptionsI>('options');
    this.countdownQuestionConfig = {
      leftTime: Number(this.options.durationQuestion),
      format: 's',
      demand: true,
    };
  }

  async getRandomQuestion(): Promise<void> {
    this.participant = await this.storageProvider.get<ParticipantI>('currentShift');
    this.question = this.questionsProvider.getRandomQuestion(this.options);
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
      this.startQuestion()
    }
  }

  async startQuestion(): Promise<void> {
    this.states.countdownQuestion = true;
    this.states.buttonStart = false;
    await this.questionsProvider.readQuestion(this.participant, this.question);
    this.countdownQuestion.begin();
    this.countdownQuestion.event.subscribe(() => {
      this.states.countdownQuestion = false;
    });
  }

  resetGame(): void {
    this.storageProvider.remove('options');
    this.navCtrl.navigateForward(['/']);
  }

  async voteQuestion(type: string): Promise<void> {
    this.participant = await this.questionsProvider.voteQuestion(type, this.participant);
    this.states.question = false;
  }

  nextQuestion(): void {
    this.getRandomQuestion();
    this.states.countdownQuestion = true;
    this.states.question = true;
    this.states.buttonStart = true;
  }

  goToClassification(): void {
    this.states.classification = true;
  }

  goToResume() {
    this.states.classification = false;
  }


  async openPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: QuestionMenuComponent,
      event: ev,
      translucent: true,
      componentProps: { state: this.states.pause },
    });
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
}
