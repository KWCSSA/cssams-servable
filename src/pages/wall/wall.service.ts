import {Injectable} from '@angular/core'; 
import {Http, Headers,URLSearchParams} from '@angular/http';
import {TokenService} from '../services/token'
import { Observable } from 'rxjs';



@Injectable()
export class WallService {
	constructor (private _http:Http, private _tokenservice:TokenService) {}

	getFeed(offset, limit, type) {
		var token = this._tokenservice.getToken();
		var headers = new Headers();
		headers.append("x-access-token",this._tokenservice.getToken());
		var params = new URLSearchParams();
		params.set('offset', offset);
		params.set('limit', limit);
		var url = 'http://ituwcssa.com:5500/feed/'+type;

		return this._http.get(url, {headers:headers, search: params}).map(res => res.json());
	}

	like(postingID) {
		var headers = new Headers();
		headers.append("x-access-token",this._tokenservice.getToken());
		return this._http.post('http://ituwcssa.com:5500/posting/'+postingID+'/like', {}, {headers:headers}).map(res => res.json());
	}

	disLike(postingID) {
		var headers = new Headers();
		headers.append("x-access-token",this._tokenservice.getToken());
		return this._http.delete('http://ituwcssa.com:5500/posting/'+postingID+'/like', {headers:headers}).map(res => res.json());
	}
	

}