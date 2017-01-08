import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import {TokenService} from '../pages/services/token';
import {Storage} from '@ionic/storage';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})

export class MyApp {
  public rootPage: any;
  public logon: boolean;

  constructor(private platform: Platform, private _tokenservice: TokenService, public storage: Storage) {

    platform.ready().then(() => {
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

