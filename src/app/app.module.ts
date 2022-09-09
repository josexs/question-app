import { Camera } from '@ionic-native/camera/ngx';
import { GameProvider } from './providers/api/game.provider';
import { LoadingProvider } from './providers/ionic/loading.provider';
import { AlertProvider } from './providers/ionic/alert.provider';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule } from '@angular/forms';
import { QuestionsProvider } from '@providers/api/questions.provider';
import { UtilsProvider } from '@providers/misc/utils.provider';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { GtagModule } from 'angular-gtag';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        IonicStorageModule.forRoot(),
        IonicModule.forRoot(),
        AppRoutingModule,
        GtagModule.forRoot({ trackingId: 'G-KW4L8CBSK4', trackPageviews: true }),
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ],
    providers: [
        Camera,
        GameProvider,
        QuestionsProvider,
        UtilsProvider,
        StatusBar,
        SplashScreen,
        AlertProvider,
        LoadingProvider,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
