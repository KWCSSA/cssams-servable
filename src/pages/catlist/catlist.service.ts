import {Injectable} from '@angular/core'; 
import {Http} from '@angular/http';




export interface ShopCard {
	title:string;
	address:string;
	description:string;
	phone:string;
	imageUrl:string;
	time: string;
	id: string;
	localImageURL:string;
}



@Injectable()
export class CatlistService {  

	constructor(private _http: Http) {}


}