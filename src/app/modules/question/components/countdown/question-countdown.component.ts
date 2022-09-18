import { Component, Input } from '@angular/core';

@Component({
  selector: 'question-countdown',
    templateUrl: 'question-countdown.component.html',
  styleUrls: ['./question-countdown.component.scss']
})
export class QuestionCountdownComponent {
  @Input() countdownCurrent: number;
  @Input() countdownCurrentPercentage: string;
  constructor() {}
}
