import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { IonicStorageModule } from '@ionic/storage'
import { SQLite } from '@ionic-native/sqlite/ngx';
import { DBTaskService } from './services/dbtask.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthenticationService } from './services/authentication.service';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    HttpClientModule,
    BrowserModule,
     IonicModule.forRoot(),
      AppRoutingModule,
       IonicStorageModule.forRoot()],
  providers: [
    QRScanner, 
    StatusBar,
    SplashScreen,
    SQLite,
    DBTaskService,
    AuthGuardService,
    AuthenticationService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
