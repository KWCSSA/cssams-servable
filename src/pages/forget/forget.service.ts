import {Injectable} from '@angular/core'; 
import {Http} from '@angular/http';

@Injectable()
export class ForgetService {  

	constructor(private _http: Http) {}

	submitEmail(email:String) {
		return this._http.post('http://ituwcssa.com:5500/forgot',{email:email}).map(res => res.json());
	}
}