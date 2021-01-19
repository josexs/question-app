import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ParticipantI } from '@interfaces/participant.interface';

@Component({
  selector: 'question-resume',
  templateUrl: 'question-resume.component.html',
})
export class QuestionResumeComponent {
  @Input() currentShift: ParticipantI;
  @Output() goToNextQuestion = new EventEmitter();
  @Output() goToClassification = new EventEmitter();
  constructor() {}
}
