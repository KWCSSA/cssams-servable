import {Injectable} from '@angular/core';  
import {Http, Headers} from '@angular/http'
import {TokenService} from '../services/token'
import { Observable } from 'rxjs';

@Injectable()
export class PopoverService {
  constructor (private _http:Http, private _tokenservice:TokenService) {
  }

  submitEmail(email:String) {
    return this._http.post('http://ituwcssa.com:5500/forgot',{email:email}).map(res => res.json());
  }
  

}