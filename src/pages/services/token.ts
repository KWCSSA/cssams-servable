import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';


@Injectable()
export class TokenService {

	username:string;
	token:string;
	id:string
	constructor(public storage:Storage){}

	isLogon() {
		return this.storage.get('token');
	}

	setDeviceToken(dToken: string) {
		return this.storage.set('deviceToken', dToken);
	}

	getDeviceToken() {
		return this.storage.get('deviceToken');
	}

	setToken(token:string, id:string) {
		this.token = token;
		this.id = id;
		this.storage.set('token', token).then(()=> {
			this.storage.set('_id', id);
		}); 
	}

	getId() {
		return this.id;
	}



	getToken() {
		return this.token;
	}

	logout() {
		this.storage.remove('localImageURL').then (res =>console.log(res),err=>console.log(err));
		return this.storage.remove('token').then (res =>console.log(res),err=>console.log(err));
	}

}