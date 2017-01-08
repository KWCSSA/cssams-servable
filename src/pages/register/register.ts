import { NavController} from 'ionic-angular';
import {Http,Headers} from '@angular/http'
import {Component} from '@angular/core'
// import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'register.html',
  selector: 'page-register'
})

export class RegisterPage {
    public user: any;


   constructor(private _nav: NavController, private _http:Http) {
          this.user = {
           password: '',
           fname:'',
           lname:'',
           repassword:'',
           email:''
         }

    }

    register(fname:string,lname:string,password:string,email:string) {

    	var headers = new Headers();
    	headers.append('Content-Type','application/json');

     	this._http.post("http://ituwcssa.com:5500/register",JSON.stringify({fname:fname,lname:lname,email:email,password:password}),{headers:headers}).map(res => res.json())
     	.subscribe(data => {
             if (data.success) {
                 console.log(data);
                 this._nav.pop();
             }
             else {
                 console.log(data.Message);
                 if (data.Message.message) {
                   alert(data.Message.message);
                 }
                 else {
                     alert(data.Message.errmsg);
                 }
             }
         },
     			err => console.log(err));

    }

        onSubmit(value:any): void { 
            this.register(value.fname,value.lname,value.password,value.email);
        }
    }
