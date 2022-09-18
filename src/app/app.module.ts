import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { GtagModule } from 'angular-gtag';
import { navAnimation } from '@animations';
import {
  AlertProvider,
  GameProvider,
  LoadingProvider,
  QuestionsProvider,
  UtilsProvider,
} from '@providers';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot({
      navAnimation: navAnimation,
      statusTap: true,
      mode: 'ios',
    }),
    AppRoutingModule,
    GtagModule.forRoot({ trackingId: 'G-KW4L8CBSK4', trackPageviews: true }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [
    AlertProvider,
    GameProvider,
    LoadingProvider,
    QuestionsProvider,
    UtilsProvider,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
