import {NavController} from 'ionic-angular';
import {Http,Headers} from '@angular/http'
import {Component} from '@angular/core'
import {WallPostService} from './wallpost.service';
import {TokenService} from '../services/token';
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-wallpost',
  templateUrl: 'wallpost.html'
})

export class WallPostPage {
    constructor(private _nav: NavController,
          		private _tokenservice:TokenService,
          		private _wallservice: WallPostService,
          		public events: Events
         		) {}

    public content: String;
    post() {
    	this._wallservice.postWall(this.content).subscribe (data => {
    		if (data.success) {
    			this.events.publish('post:created');
    			this._nav.pop();
    		}
    	}, err => {
    		alert(err);
    	});
    }

}