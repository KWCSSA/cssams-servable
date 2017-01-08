import {NavController} from 'ionic-angular';
import {Http} from '@angular/http'
import {Component} from '@angular/core'
import {ForgetService} from './forget.service'
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'forget.html',
  selector: 'page-forget',
})

export class ForgetPage {
	public email: any;
	public timer: any = {
		running: false,
		time: 30,
	}
	public interval: any;
   
	constructor(private _nav: NavController, 
		        private _http:Http, 
		        private _forgetservice: ForgetService) {
		this.email = {
			email: ''
		};
	}
	runTimer ()  {
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

	forget(value:any) {
		this._forgetservice.submitEmail(value.email)
		.subscribe(data => {
			if (data.success) {
				this.runTimer();
				alert("发送成功！请查收邮件修改密码！");
			}

		}, err => alert("失败!Email地址有误"));
	}
  }
