import {Injectable} from '@angular/core'; 
import {Http, Headers} from '@angular/http';
import { Observable } from 'rxjs';
export interface category {

	Restaurant: ShopCard[];
}

export interface ShopCard {
	title:string;
	address:string;
	description:string;
	phone:string;
	imageUrl:string;
	time: string;
	id: string,
	localImageUrl:string;
}


@Injectable()
export class CategoryService {  

	constructor(private _http: Http) {}

	

	getShops(){
		return this._http.get('http://ituwcssa.com:5500/bosses').map(res => res.json());
	}

	



}