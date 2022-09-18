import { Component, Input, EventEmitter, Output } from '@angular/core';
import { OptionsGameI } from '@interfaces/options-game.interface';

@Component({
  selector: 'options-init',
  templateUrl: 'options-init.component.html',
})
export class OptionsInitComponent {
  @Input() options: OptionsGameI;
  @Input() typesOfGame: { name: string; value: string }[] = [];
  @Output() getTotalOfQuestionOfType: EventEmitter<void> = new EventEmitter<void>();
  @Output() continue: EventEmitter<void> = new EventEmitter<void>();
  @Output() goToDashboard: EventEmitter<void> = new EventEmitter<void>();
  @Output() changeNumberOfParticipants: EventEmitter<void> = new EventEmitter<void>();
}
