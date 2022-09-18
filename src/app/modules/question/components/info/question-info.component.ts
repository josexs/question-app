import { Component, Input } from '@angular/core';
import { QuestionI } from 'app/shared/interfaces/question.interface';

@Component({
  selector: 'question-info',
  templateUrl: 'question-info.component.html',
  styleUrls: ['./question-info.component.scss'],
})
export class QuestionInfoComponent {
  @Input() question: QuestionI;
}
