import {Injectable} from '@angular/core';  
import {Http, Headers} from '@angular/http'
import {TokenService} from '../services/token'
import { Observable } from 'rxjs';

@Injectable()
export class CardService {
	constructor (private _http:Http, private _tokenservice:TokenService) {
	}

	getCardImage () {
		var token = this._tokenservice.getToken();
		var headers = new Headers();
		headers.append("x-access-token",this._tokenservice.getToken());
		return this._http.get("http://ituwcssa.com:5500/cardimage",{headers:headers}).map(res =>res.json());
	}

}