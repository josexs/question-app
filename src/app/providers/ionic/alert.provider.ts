import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class AlertProvider {
  constructor(private alertCtrl: AlertController) {}

  async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      cssClass: 'alertInfo',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentAlertWithButtons(header: string, message: string, buttons: any[]) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      cssClass: 'alertInfo',
      buttons,
    });
    await alert.present();
  }
}
