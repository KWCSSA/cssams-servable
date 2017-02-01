import {Injectable} from '@angular/core';  
import {Http} from '@angular/http'
import {TokenService} from '../services/token'


@Injectable()
export class PopoverService {
  constructor (private _http:Http, private _tokenservice:TokenService) {
  }

  forgetEmail(email:String) {
    return this._http.post('http://ituwcssa.com:5500/forgot',{email:email}).map(res => res.json());
  }

  verifyEmail(email:String) {
    return this._http.post('http://ituwcssa.com:5500/verifyemail',{email:email}).map(res => res.json());
  }
  

}