import { NavController,App, NavParams} from 'ionic-angular';
import {OnInit, Component} from '@angular/core'
import {TokenService} from '../services/token'
import {PostingService} from './posting.service'


@Component({
  templateUrl: 'posting.html',
  selector: 'page-posting',
})

export class PostingPage implements OnInit{
  public posting: any;
  comment: string;

  constructor(private _nav: NavController,
              private _tokenservice:TokenService,
              private _navParams:NavParams,
              private _postingservice: PostingService,
              private _app:App) {
    
  }

  ngOnInit () {
  	var postingID = this._navParams.get('postingID');
    console.log(postingID);
  	this._postingservice.getPosting(postingID).subscribe(data => {
      console.log (data);
  		this.posting = data;
  	},
  	err => alert(err));
  }

  doRefresh(refresher) {
      console.log('Begin async operation', refresher);
      this._postingservice.getPosting(this.posting._id).subscribe(data => {
        this.posting = data;
        refresher.complete();
      });
    }

  postComment() {
    this._postingservice.postComment(this.posting._id, this.comment).subscribe(data => {
      if(data.success) {
        alert("Comment successfully posted");
        this._postingservice.getPosting(this.posting._id).subscribe(data => {
          console.log (data);
          this.posting = data;
      },
        err => alert(err));
      }
    },
    err => alert(err));
  }




}