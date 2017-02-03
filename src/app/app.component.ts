import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar  } from 'ionic-native';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { TokenService} from '../pages/services/token';
import { Storage} from '@ionic/storage';
import {ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import { PostingPage } from '../pages/posting/posting';
import {
  Push,
  PushToken
} from '@ionic/cloud-angular';



@Component({
  template: `<ion-nav #myNav [root]="rootPage"></ion-nav>`
})

export class MyApp {
  public rootPage: any;
  public logon: boolean;

  @ViewChild('myNav') nav: NavController

  constructor(private platform: Platform, private _tokenservice: TokenService, public storage: Storage
    , private alertCtrl: AlertController, public push: Push) {

    platform.ready().then(() => {

      this.push.register().then((t: PushToken) => {
        return this.push.saveToken(t);
      }).then((t: PushToken) => {
        this._tokenservice.setDeviceToken(t.token).then(() => {
          console.log('Token saved:', t.token);
        });
      });

      this.push.rx.notification()
        .subscribe((msg) => {
          var data = msg.raw.additionalData as any;
          if (data.foreground) {
            if (data.postingId) {
              alert("You get a new comment in your post!");
              this.nav.push(PostingPage, {postingId:data.postingId});
            }
          } else {
            if (data.postingId) {
              this.nav.push(PostingPage, {postingId:data.postingId});
            }
          }
      });


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

