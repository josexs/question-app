import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OptionsGameI, ParticipantI } from '@interfaces';
import { StorageProvider } from 'app/shared/providers/ionic/storage.provider';

@Component({
  selector: 'app-options-resume',
  templateUrl: 'options-resume.page.html',
})
export class OptionsResumePage implements OnInit {
  @ViewChild('slider') slides: any;
  options: OptionsGameI = {
    totalParticipants: '2',
    type: 'normal',
    state: 'todo',
    durationQuestion: '15',
    participants: [],
    rounds: '0',
  };
  shifts: ParticipantI[] = [];
  typesOfGame = [
    { name: 'Normal', value: 'normal' },
    { name: 'Fuerte', value: 'hard' },
  ];
  constructor(
    private router: Router,
    private storageProvider: StorageProvider
  ) {}

  async ngOnInit() {
    setTimeout(() => {
      if (this.slides) {
        this.slides.lockSwipes(true);
      }
    }, 500);
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

  goToBack(): void {
    this.storageProvider.clear();
    this.router.navigate(['/options']);
  }
}
