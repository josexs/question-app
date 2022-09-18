import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'question-buttons',
  templateUrl: 'question-buttons.component.html',
  styleUrls: ['./question-buttons.component.scss'],
})
export class QuestionButtonsComponent {
  @Input() states: {
    buttonStart: boolean;
    question: boolean;
    countdownQuestion: boolean;
  };
  @Input() isFirstQuestion: boolean;
  @Output() startQuestion: EventEmitter<void> = new EventEmitter();
  @Output() voteQuestion: EventEmitter<string> = new EventEmitter<string>();
}
