import { NavController, App, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { TokenService } from '../services/token';
import { PostingService } from './posting.service';


@Component({
  templateUrl: 'posting.html',
  selector: 'page-posting',
})

export class PostingPage {
  public posting: any;
  public _id: string;
  public isAnon: Boolean = false;
  comment: string;

  constructor(private _nav: NavController,
    private _tokenservice: TokenService,
    private _navParams: NavParams,
    private _postingservice: PostingService,
    private _app: App) {

  }

  ionViewWillEnter() {
    this._id = this._tokenservice.getId();
    this.posting = this._navParams.get('posting');
    //  console.log(postingID);
    // this._postingservice.getPosting(postingID).subscribe(data => {
    //    console.log (data);
    //   this.posting = data;
    // },
    // err => alert(err));
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this._postingservice.getPosting(this.posting._id).subscribe(data => {
      this.posting = data;
      refresher.complete();
    });
  }

  postComment() {
    if (this.comment.length < 3) return alert("Minimum post is 3 characters.");
    this._postingservice.postComment(this.posting._id, this.comment, this.isAnon).subscribe(data => {
        if (data.success) {
          this._postingservice.getPosting(this.posting._id).subscribe(data => {
              console.log(data);
              this.posting = data;
              },
            err => alert(err));
        }
      },
      err => alert(err));
  }

  toggleLike(posting, i) {
    var index = posting.likes.indexOf(this._id);
    if (index == -1) {
      this._postingservice.like(posting._id).subscribe(data => {
          if (data.success) {
            this.posting.likes.push(this._id);
          }
        },
        err => alert(err));
    } else {
      this._postingservice.disLike(posting._id).subscribe(data => {
          console.log(data);
          if (data.success) {
            this.posting.likes.splice(index, 1);
          }
        },
        err => alert(err));
    }
  }
}