import { Component } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'question-menu',
  templateUrl: 'question-menu.component.html',
})
export class QuestionMenuComponent {
  state: boolean;
  constructor(private navParams: NavParams, private popoverCtrl: PopoverController) {
    this.state = this.navParams.get('state');
  }

  play() {
    this.popoverCtrl.dismiss({action: 'play'});
  }
  pause() {
    this.popoverCtrl.dismiss({action: 'pause'});
  }
  reload() {
    this.popoverCtrl.dismiss({action: 'reload'});
  }
}
