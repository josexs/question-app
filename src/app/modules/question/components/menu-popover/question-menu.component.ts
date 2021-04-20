import { AlertProvider } from '@providers/ionic/alert.provider';
import { Component } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'question-menu',
  templateUrl: 'question-menu.component.html',
})
export class QuestionMenuComponent {
  state: boolean;
  constructor(
    private navParams: NavParams,
    private popoverCtrl: PopoverController,
    private alertProvider: AlertProvider
  ) {
    this.state = this.navParams.get('state');
  }

  reload(): void {
    this.alertProvider.presentAlertWithButtons('¿Estas seguro?', 'Vas a terminar el juego', [
      { text: 'No', role: 'cancel' },
      { text: 'Si', handler: () => this.confirmReload() },
    ]);
  }

  confirmReload(): void {
    this.popoverCtrl.dismiss({ action: 'reload' });
  }
}
