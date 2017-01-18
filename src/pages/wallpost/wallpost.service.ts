import {Injectable} from '@angular/core'; 
import {Http, Headers} from '@angular/http';
import {TokenService} from '../services/token'
import { Observable } from 'rxjs';



@Injectable()
export class WallPostService {
	constructor (private _http:Http, private _tokenservice:TokenService) {}

	postWall (content:String, isAnon:Boolean) {
		var headers = new Headers();
		headers.append("x-access-token",this._tokenservice.getToken());
		return this._http.post('http://ituwcssa.com:5500/posting',{content:content, isAnon: isAnon},{headers:headers}).map(res => res.json());
	}

}