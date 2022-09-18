import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { QuestionI } from '@interfaces';
import { QuestionsProvider } from '@providers';

@Component({
  selector: 'admin-list-all',
  templateUrl: 'admin-list-all.page.html',
})
export class AdminListAllPage {
  items: QuestionI[] = [];
  loading = true;
  error = false;
  constructor(
    private questionsProvider: QuestionsProvider,
    private router: Router
  ) {}

  ionViewWillEnter(): void {
    this.getAllQuestions();
  }

  async getAllQuestions(): Promise<void> {
    try {
      await this.questionsProvider.getQuestions();
      this.items = this.questionsProvider.questions;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.error = true;
    }
  }

  goToEdit(item: QuestionI): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        item: JSON.stringify(item),
        route: JSON.stringify({ sent: false }),
      },
    };
    this.router.navigate([`admin/question`], navigationExtras);
  }
}
