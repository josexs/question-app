import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AlertProvider, QuestionsProvider } from '@providers';
import { QuestionI } from '@interfaces';

@Component({
  selector: 'admin-create-question',
  templateUrl: 'admin-create-question.page.html',
  styleUrls: ['./admin-create-question.page.scss'],
})
export class AdminCreateQuestionPage implements OnInit {
  question: UntypedFormGroup;
  item: QuestionI;
  isSent: boolean;
  routeBack: string;
  constructor(
    private questionsProvider: QuestionsProvider,
    private alertProvider: AlertProvider,
    private router: Router,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit() {
    this.createInputs();
  }

  createInputs() {
    this.question = this.formBuilder.group({
      author: ['', [Validators.required, Validators.minLength(4)]],
      text: ['', [Validators.required, Validators.minLength(10)]],
      type: ['normal', [Validators.required]],
      state: [false, [Validators.required]],
    });
  }

  create() {
    if (this.state.value) {
      this.alertProvider.presentAlertWithButtons(
        '¡Oye!',
        'Vas a publicar la pregunta, ¿estas seguro?',
        [
          {
            text: 'No',
            role: 'cancel',
          },
          {
            text: 'Si',
            handler: () => this.confirmCreate(),
          },
        ],
        'alert-warning'
      );
    } else {
      this.confirmCreate();
    }
  }

  confirmCreate() {
    const question: QuestionI = {
      text: this.text.value,
      type: this.type.value,
      state: this.state.value,
      author: 'Admin',
      counter: 0,
      reports: 0,
      gender: null,
    };
    this.questionsProvider.createAdminCuestion(question).then(
      () => {
        this.alertProvider.presentAlertWithButtons(
          '¡Vale!',
          'La pregunta ha sido publicada',
          [
            { text: 'Publicar otra', handler: () => this.createInputs() },
            {
              text: 'OK',
              handler: () => {
                const route = this.state.value ? '/admin/all' : '/admin/sent';
                this.router.navigate([route]);
              },
            },
          ]
        );
      },
      (error) => {
        console.error(error);
        this.alertProvider.presentAlert(
          '¡Vaya!',
          'Hemos tenido un problema...'
        );
      }
    );
  }

  get author() {
    return this.question.get('author');
  }

  get text() {
    return this.question.get('text');
  }

  get type() {
    return this.question.get('type');
  }

  get state() {
    return this.question.get('state');
  }
}
