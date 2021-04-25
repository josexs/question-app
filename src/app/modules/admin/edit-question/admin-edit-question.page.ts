import { QuestionsProvider } from '@providers/api/questions.provider';
import { Component } from '@angular/core';
import { QuestionI } from '@interfaces/question.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertProvider } from '@providers/ionic/alert.provider';

@Component({
  selector: 'admin-edit-question',
  templateUrl: 'admin-edit-question.page.html',
})
export class AdminEditQuestionPage {
  item: QuestionI;
  isSent: boolean;
  routeBack: string;
  constructor(
    private questionsProvider: QuestionsProvider,
    private route: ActivatedRoute,
    private alertProvider: AlertProvider,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params && params.item && params.route) {
        this.item = JSON.parse(params.item);
        this.isSent = JSON.parse(params.route).sent;
        this.routeBack = this.isSent ? 'admin/sent' : 'admin/all';
      }
    });
  }

  approve() {
    this.item.state = true;
    this.edit('La pregunta ha sido aprobada');
  }

  edit(msg = 'La pregunta se ha actualizado') {
    this.questionsProvider.updateQuestion(this.item).then(
      () => {
        this.alertProvider.presentAlert('¡Vale!', msg);

        this.router.navigate([this.routeBack]);
      },
      (error) => {
        console.error(error);
        this.alertProvider.presentAlert('¡Vaya!', 'Hemos tenido un problema...');
      }
    );
  }

  goBack() {
    this.router.navigate([this.routeBack]);
  }

  delete() {
    this.alertProvider.presentAlertWithButtons('¿Estas seguro?', 'Vas a eliminar la pregunta', [
      {
        text: 'No',
        role: 'cancel',
      },
      {
        text: 'Si',
        handler: () => this.deleteConfirm(),
      },
    ]);
  }

  deleteConfirm() {
    this.questionsProvider.deleteQuestion(this.item._id).then(
      () => {
        this.alertProvider.presentAlert('¡Vale!', 'La pregunta ha sido eliminada');
        this.router.navigate([this.routeBack]);
      },
      () =>
        this.alertProvider.presentAlert(
          '¡Vaya!',
          'Hemos tenido un problema al eliminar la pregunta'
        )
    );
  }
}
