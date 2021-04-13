import { QuestionsProvider } from '@providers/api/questions.provider';
import { Component } from '@angular/core';
import { QuestionI } from '@interfaces/question.interface';
import { NavController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'admin-list-sent',
  templateUrl: 'admin-list-sent.page.html',
})
export class AdminListSentPage {
  items: QuestionI[] = [];
  constructor(private questionsProvider: QuestionsProvider, private router: Router) {
    this.getAllQuestions();
  }

  async getAllQuestions() {
    this.items = await this.questionsProvider.getQuestionsSent();
  }

  goToEdit(item: QuestionI) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        item: JSON.stringify(item),
        route: JSON.stringify({ sent: true }),
      },
    };
    this.router.navigate([`admin/question`], navigationExtras);
  }
}
