import {Injectable} from '@angular/core';  
import {Http, Headers} from '@angular/http'
import {TokenService} from '../services/token'
import { Observable } from 'rxjs';

@Injectable()
export class CardService {
  constructor (private _http:Http, private _tokenservice:TokenService) {
  }

  getProfile() {
    var token = this._tokenservice.getToken();
    var headers = new Headers();
    headers.append("x-access-token",this._tokenservice.getToken());
    return this._http.get('http://ituwcssa.com:5500/profile',{headers:headers}).map(res => res.json());
  }


  getCardImage () {
    var token = this._tokenservice.getToken();
    var headers = new Headers();
    headers.append("x-access-token",this._tokenservice.getToken());
    return this._http.get("http://ituwcssa.com:5500/cardimage",{headers:headers}).map(res =>res.json());
  }

  submitEmail(email:String) {
    return this._http.post('http://ituwcssa.com:5500/forgot',{email:email}).map(res => res.json());
  }
  

}