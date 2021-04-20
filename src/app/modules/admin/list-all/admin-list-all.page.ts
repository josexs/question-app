import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { QuestionI } from '@interfaces/question.interface';
import { QuestionsProvider } from '@providers/api/questions.provider';

@Component({
  selector: 'admin-list-all',
  templateUrl: 'admin-list-all.page.html',
})
export class AdminListAllPage {
  items: QuestionI[] = [];
  constructor(private questionsProvider: QuestionsProvider, private router: Router) {}

  ionViewWillEnter(): void {
    this.getAllQuestions();
  }

  async getAllQuestions(): Promise<void> {
    this.items = await this.questionsProvider.getQuestions();
  }

  goToEdit(item: QuestionI): void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        item: JSON.stringify(item),
        route: JSON.stringify({ sent: false }),
      },
    };
    this.router.navigate([`admin/question`], navigationExtras);
  }
}
