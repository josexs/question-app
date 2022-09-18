import { GameProvider } from './shared/providers/api/game.provider';
import { LoadingProvider } from './shared/providers/ionic/loading.provider';
import { AlertProvider } from './shared/providers/ionic/alert.provider';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { FormsModule } from '@angular/forms';
import { QuestionsProvider } from 'app/shared/providers/api/questions.provider';
import { UtilsProvider } from 'app/shared/providers/misc/utils.provider';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { GtagModule } from 'angular-gtag';
import { navAnimation } from '@animations';

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
    GameProvider,
    QuestionsProvider,
    UtilsProvider,
    AlertProvider,
    LoadingProvider,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
