import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class AlertProvider {
  constructor(private alertCtrl: AlertController) {}

  async presentAlert(header: string, message: string, cssClass = 'alert-info') {
    const alert = await this.alertCtrl.create({
      header,
      message,
      cssClass,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentAlertWithButtons(
    header: string,
    message: string,
    buttons: any[],
    cssClass = 'alert-info'
  ) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      cssClass,
      buttons,
    });
    await alert.present();
  }
}
