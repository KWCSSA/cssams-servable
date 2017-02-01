import {Injectable} from '@angular/core'; 
import {Http} from '@angular/http';


@Injectable()
export class CategoryService {  

	constructor(private _http: Http) {}

	getShops(){
		return this._http.get('http://ituwcssa.com:5500/bosses').map(res => res.json());
	}
}