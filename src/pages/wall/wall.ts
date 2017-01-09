import {NavController} from 'ionic-angular';
import {Http,Headers} from '@angular/http'
import {Component, OnInit} from '@angular/core'
import {WallService} from './wall.service';
import {WallPostPage} from '../wallpost/wallpost';
import {TokenService} from '../services/token';
import {PostingPage} from '../posting/posting';
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-wall',
  templateUrl: 'wall.html'
})

export class WallPage implements OnInit{
    public postings: any;
    public offset: number = 0;
    public limit: number = 10;
    public _id: string;
    // public postings: any;

    constructor(private _nav: NavController,
          		private _tokenservice:TokenService,
          		private _wallservice: WallService,
          		public events: Events
         		) {}

    doRefresh(refresher) {
      console.log('Begin async operation', refresher);
      this.offset = 0;
      this._wallservice.getFeed(this.offset, this.limit).subscribe(data => {
        this.postings = data;
        refresher.complete();
      });
    }

    doInfinite(infiniteScroll) {
      console.log('scrooooolll INFINITEEE');
      this.offset += 10;
      this._wallservice.getFeed(this.offset, this.limit).subscribe(data => {
        this.postings = this.postings.concat(data);
        infiniteScroll.complete();
      });
  }



    


    ngOnInit () {
    	this._id = this._tokenservice.getId();
        this._wallservice.getFeed(this.offset, this.limit).subscribe(data => {
        	this.postings = data;
      	}); 
      	this.events.subscribe('post:created', () => {
		  // user and time are the same arguments passed in `events.publish(user, time)`
			this._wallservice.getFeed(this.offset, this.limit).subscribe(data => {
	        	this.postings = data;
	      	}); 
		});

    }

    seeComments(posting, i) {
    	this._nav.push(PostingPage, {posting: posting});
    }

    toggleLike(posting, i) {
    	var index = posting.likes.indexOf(this._id);
    	if (index == -1) {
            this._wallservice.like(posting._id).subscribe(data => {
		        if(data.success) {
		          this.postings[i].likes.push(this._id);
		        }
		  	},
	      		err => alert(err));
	      	}
	    else {
	    	this._wallservice.disLike(posting._id).subscribe(data => {
	    		console.log(data);
		        if(data.success) {
		          this.postings[i].likes.splice(index, 1);
		        }
		  },
	      	err => alert(err));
	      }
	}

    

    post() {
		  this._nav.push(WallPostPage,{});
	  }

}