import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OptionsI } from '@interfaces/init-options.interface';
import { ParticipantI } from '@interfaces/participant.interface';
import { StorageProvider } from '@providers/ionic/storage.provider';

@Component({
  selector: 'app-options-resume',
  templateUrl: 'options-resume.page.html',
})
export class OptionsResumePage implements OnInit {
  options: OptionsI = {
    numberParticipants: '2',
    type: 'normal',
    state: 'todo',
    durationQuestion: '15',
    participants: [],
  };
  shifts: ParticipantI[] = [];
  typesOfGame = [
    { name: 'Normal', value: 'normal' },
    { name: 'Fuerte', value: 'hard' },
  ];
  constructor(private router: Router, private storageProvider: StorageProvider) {}

  async ngOnInit() {
      this.options = await this.storageProvider.get('options');
      this.shifts = await this.storageProvider.get('shifts');
  }

  startGame() {
    this.options.state = 'inProgress';
    this.storageProvider.set('options', this.options);
    this.storageProvider.set('currentShift', this.shifts[0]);
    this.storageProvider.set('firstQuestion', true);
    this.router.navigate(['question']);
  }

  resetGame(): void {
    this.storageProvider.clear();
    this.router.navigate(['/dashboard']);
  }
}
