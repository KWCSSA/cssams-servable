import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import {TokenService} from '../pages/services/token';
import {Storage} from '@ionic/storage';
import {
  Push,
  PushToken
} from '@ionic/cloud-angular';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})

export class MyApp {
  public rootPage: any;
  public logon: boolean;

  constructor(private platform: Platform, 
              private _tokenservice: TokenService, 
              public storage: Storage,
              public push: Push) {

    platform.ready().then(() => {

      this.push.register().then((t: PushToken) => {
        return this.push.saveToken(t);
      }).then((t: PushToken) => {
        console.log('Token saved:', t.token);
      });

      this.push.rx.notification()
        .subscribe((msg) => {
          alert(msg.title + ': ' + msg.text);
        });

      // push.on('registration', (data) => {
      //   console.log("device token ->", data.registrationId);
      //   //TODO - send device token to server
      // });
      // push.on('notification', (data) => {
      //   console.log('message', data.message);
      //   let self = this;
      //   //if user using app and push notification comes
      //   if (data.additionalData.foreground) {
      //     // if application open, show popup
      //     let confirmAlert = this.alertCtrl.create({
      //       title: 'New Notification',
      //       message: data.message,
      //       buttons: [{
      //         text: 'Ignore',
      //         role: 'cancel'
      //       }, {
      //         text: 'View',
      //         handler: () => {
      //           //TODO: Your logic here
      //           self.nav.push(DetailsPage, {message: data.message});
      //         }
      //       }]
      //     });
      //     confirmAlert.present();
      //   } else {
      //     //if user NOT using app and push notification comes
      //     //TODO: Your logic on click of push notification directly
      //     self.nav.push(DetailsPage, {message: data.message});
      //     console.log("Push notification clicked");
      //   }
      // });
      // push.on('error', (e) => {
      //   console.log(e.message);
      // });
    // });

      _tokenservice.isLogon().then((token) => {
      if(token) {
      	this.storage.get('_id').then((id) => {
        	this._tokenservice.setToken(token, id);
        	this.logon = true;
          	this.rootPage = TabsPage;
        });   
      }
      else {
        console.log("no token");
        this.logon = false;
        this.rootPage  = LoginPage;
      }
      });
    });
    StatusBar.styleDefault();
  }
  }

