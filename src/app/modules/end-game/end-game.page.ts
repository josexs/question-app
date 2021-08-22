import { ParticipantI } from '@interfaces/participant.interface';
import { StorageProvider } from '@providers/ionic/storage.provider';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-end-game',
  templateUrl: 'end-game.page.html',
})
export class EndGamePage {
  shifts = [];
  winner;
  loser;
  state = false;
  constructor(private storageProvider: StorageProvider, private router: Router) {}

  async ionViewWillEnter(): Promise<void> {
    this.getClassification();
  }

  async getClassification() {
    let shifts: ParticipantI[] = await this.storageProvider.get('shifts');
    this.shifts = shifts.sort((a, b) => {
      if (a.positive - a.negative > b.positive - b.negative) {
        return -1;
      }
      if (a.positive - a.positive < b.positive - b.negative) {
        return 1;
      }
    });
    this.winner = this.shifts[0];
    this.loser = this.shifts[this.shifts.length - 1];
    this.state = true;
  }

  goToHome() {
    this.router.navigate(['/home-menu']);
  }
}
