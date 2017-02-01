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
    public isAnon: Boolean = false;

    post() {
      if (this.content.length < 15) return alert("Minimum post is 15 characters.");
    	this._wallservice.postWall(this.content, this.isAnon).subscribe (data => {
    		if (data.success) {
    			this.events.publish('post:created');
    			this._nav.pop();
    		} else {
          alert(data.msg);
        }
    	}, err => {
    		alert(err);
    	});
    }

}