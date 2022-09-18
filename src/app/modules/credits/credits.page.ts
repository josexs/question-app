import { QuestionsProvider } from 'app/shared/providers/api/questions.provider';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gtag } from 'angular-gtag';

@Component({
  selector: 'app-credits',
  templateUrl: 'credits.page.html',
})
export class CreditsPage implements OnInit {
  authors: { author: string; questions: number }[] = [];
  constructor(
    private gtag: Gtag,
    private router: Router,
    private questionsProvider: QuestionsProvider
  ) {}

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors() {
    this.questionsProvider.getAuthors().then(
      (response) => {
        this.authors = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  goToDashboard() {
    this.gtag.event('goToDashboard');
    this.router.navigate(['/dashboard']);
  }
}
