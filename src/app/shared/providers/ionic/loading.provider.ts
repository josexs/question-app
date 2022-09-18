import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class LoadingProvider {
  constructor(private loadingCtrl: LoadingController) {}

  presentLoading(
    message = 'Por favor, espera'
  ): Promise<HTMLIonLoadingElement> {
    return this.loadingCtrl.create({
      message,
      duration: 5000,
      cssClass: 'loadingInfo',
    });
  }
}
