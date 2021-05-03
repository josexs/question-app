import { StorageProvider } from '@providers/ionic/storage.provider';
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
  @Output() goToEnd = new EventEmitter();
  shifts: ParticipantI[] = [];
  state = false;
  position = null;
  constructor(private storageProvider: StorageProvider) {
    this.getStats();
  }

  async getStats() {
    try {
      this.shifts = await this.storageProvider.get('shifts');
      this.shifts.sort((a, b) => {
        if (a.positive - a.negative > b.positive - b.negative) {
          return -1;
        }
        if (a.positive - a.negative < b.positive - b.negative) {
          return 1;
        }
      });
      this.shifts.forEach((item, i) => {
        if (item.name === this.currentShift.name) {
          this.position = i;
        }
      });

      this.state = true;
    } catch (error) {
      console.error(error);
    }
  }
}
