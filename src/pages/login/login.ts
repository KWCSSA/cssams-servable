import {NavController} from 'ionic-angular';
import {Http,Headers} from '@angular/http'
import {Component} from '@angular/core'
import {TabsPage} from '../tabs/tabs';
import {RegisterPage} from '../register/register';
import {TokenService} from '../services/token';
import {ForgetPage} from '../forget/forget';
// import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


@Component({
  templateUrl: 'login.html',
  selector: 'page-login',
})

export class LoginPage {

    public user: any;

   constructor(private _nav: NavController, private _http:Http,private _tokenservice: TokenService) {
     this.user = {
       email:'',
       password: ''
     }
    }




     login(email:string,password:string) {


    	var headers = new Headers();
    	headers.append('Content-Type','application/json');

      this._tokenservice.getDeviceToken().then ((dToken) => {
        this._http.post("http://ituwcssa.com:5500/login",JSON.stringify({email:email,password:password,dToken:dToken}),{headers:headers}).map(res => res.json())
         .subscribe(data => {
           if(data.success) {
             console.log(data);
             this._tokenservice.setToken(data.token, data._id);
             this._nav.setRoot(TabsPage);
           }
           else {
             alert(data.msg);
           }
         },
           err => {
               alert("Login fail! Check your password and email!");
               console.log(err);
             });
          });
     }

     onSubmit(value:any) {
       this.login(value.email,value.password);
     }

     gtRegister() {
     	this._nav.push(RegisterPage);
     }

     forget() {
       this._nav.push(ForgetPage);
     }

}
