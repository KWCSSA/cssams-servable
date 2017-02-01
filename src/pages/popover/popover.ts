import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, App } from 'ionic-angular';
import { PopoverService } from './popover.service';
import {TokenService} from '../services/token';
import {LoginPage} from '../login/login';

/*
  Generated class for the Popover page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html'
})
export class PopoverPage {

  email: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController,
    private _popoverservice: PopoverService,
    private _app: App,
    private _tokenservice: TokenService) {

    this.email = this.navParams.get('email');
  }

    public timer: any = {
    running: false,
    time: 30,
  }
    public interval: any;

    close() {
      this.viewCtrl.dismiss();
    }

  resetPassword() {
    this._popoverservice.submitEmail(this.email)
    .subscribe(data => {
      if (data.success) {
        alert("发送成功！请查收邮件修改密码！");
        this.close();
      }
    })
  }

  logout() {
    this._tokenservice.logout().then(res => {
      console.log(res);
      this._app.getRootNav().setRoot(LoginPage);
      this.close();
    },
      err => console.log(err));
  }
      

}
