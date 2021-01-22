import { StorageProvider } from '@providers/ionic/storage.provider';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ParticipantI } from '@interfaces/participant.interface';

@Component({
  selector: 'question-classification',
  templateUrl: 'question-classification.component.html',
})
export class QuestionClassificationComponent implements OnInit {
  @Output() goToResume = new EventEmitter();
  shifts: ParticipantI[] = [];
  constructor(private storageProvider: StorageProvider) {}

  async ngOnInit() {
    const shifts = await this.storageProvider.get<ParticipantI[]>('shifts');
    this.shifts = shifts.sort((a, b) => {
      if (a.positive -a.negative > b.positive - b.negative) {
        return -1
      }
      if (a.positive - a.positive < b.positive - b.negative) {
        return 1
      }
    });
  }
}
