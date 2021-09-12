import { QuestionsProvider } from '@providers/api/questions.provider';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gtag } from 'angular-gtag';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionI } from '@interfaces/question.interface';
import { AlertProvider } from '@providers/ionic/alert.provider';

@Component({
  selector: 'app-send',
  templateUrl: 'send.page.html',
  styleUrls: ['./send.page.scss'],
})
export class SendPage implements OnInit {
  question: FormGroup;
  constructor(
    private gtag: Gtag,
    private router: Router,
    private questionsProvider: QuestionsProvider,
    private formBuilder: FormBuilder,
    private alertProvider: AlertProvider
  ) {}

  ngOnInit() {
    this.question = this.formBuilder.group({
      author: ['', [Validators.required, Validators.minLength(4)]],
      city: ['', [Validators.required, Validators.minLength(4)]],
      text: ['', [Validators.required, Validators.minLength(6)]],
      type: ['normal', [Validators.required]],
    });
  }

  create() {
    this.alertProvider.presentAlertWithButtons(
      '¡Oye!',
      'Vas a enviar la pregunta, ¿estas seguro?',
      [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Si',
          handler: () => this.confirmSend(),
        },
      ]
    );
  }

  confirmSend() {
    const question: any = {
      text: this.text.value,
      type: this.type.value,
      author: this.author.value,
      city: this.city.value,
    };
    this.questionsProvider.createUserCuestion(question).then(
      () => {
        this.alertProvider.presentAlert('¡Vale!', 'La pregunta ha sido enviada');
        this.router.navigate(['/home-menu']);
      },
      (error) => {
        console.error(error);
        this.alertProvider.presentAlert(
          '¡Vaya!',
          'Hemos tenido un problema..., intentalo de nuevo mas tarde'
        );
      }
    );
  }

  goToDashboard() {
    this.gtag.event('goToDashboard');
    this.router.navigate(['/dashboard']);
  }

  get text() {
    return this.question.get('text');
  }

  get type() {
    return this.question.get('type');
  }

  get author() {
    return this.question.get('author');
  }

  get city() {
    return this.question.get('city');
  }
}
