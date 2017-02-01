import { NavController,App} from 'ionic-angular';
import {OnInit, Component} from '@angular/core'
import {TokenService} from '../services/token'
import {LoginPage} from '../login/login'
import {ProfileService,User} from './profile.service'


@Component({
  templateUrl: 'profile.html',
  selector: 'page-profile',
  providers:[ProfileService]
})

export class ProfilePage implements OnInit{
  idnum:number;
  fname:string;
  lname:string;
  email:string;
  username:string;

  public timer: any = {
    running: false,
    time: 30,
  }
  public interval: any;

  constructor(private _nav: NavController,
              private _tokenservice:TokenService,
              private _profileservice: ProfileService,
              private _app:App) {
  }
  ngOnInit() {
    this.getProfile();
  }



  runTimer () {
    this.timer.running = true;
    this.interval = setInterval (() => {
      this.timer.time--;
      if (this.timer.time == 0) {
        clearInterval(this.interval);
        this.timer.running = false;
        this.timer.time = 30;
      }
    }, 1000);
  }

  getProfile() {

    this._profileservice.getProfile().subscribe(data => {
      console.log(data);
      this.idnum = data.idnum;
      this.fname = data.fname;
      this.lname = data.lname;
      this.email = data.email;
    },
    err => {
      alert(JSON.stringify(err));
    }
    )
  }

  resetPassword() {
    this._profileservice.submitEmail(this.email)
    .subscribe(data => {
      if (data.success) {
        this.runTimer();
        alert("发送成功！请查收邮件修改密码！");
      }
    })
  }

  logout() {
  	this._tokenservice.logout().then(res => {
  		console.log(res);
      this._app.getRootNav().setRoot(LoginPage);
  	},
  		err => console.log(err));
  }
}
