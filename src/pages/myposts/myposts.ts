import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TokenService } from '../services/token';
import { MypostsService } from './myposts.service';
import { PostingPage } from '../posting/posting';



@Component({
  selector: 'page-myposts',
  templateUrl: 'myposts.html'
})

export class MypostsPage {

  public postings: any;
  public _id: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  			  private _mypostsservice: MypostsService,
          private _tokenservice: TokenService) {}

  ionViewDidLoad() {
    this._id = this._tokenservice.getId();
    this._mypostsservice.getOwnPosting().subscribe(data => {
      this.postings = data;
    },
    err => alert(err));
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this._mypostsservice.getOwnPosting().subscribe(data => {
      this.postings = data;
      refresher.complete();
    });
  }


  toggleLike(posting, i) {
    var index = posting.likes.indexOf(this._id);
    if (index == -1) {
      this._mypostsservice.like(posting._id).subscribe(data => {
          if (data.success) {
            this.postings[i].likes.push(this._id);
          }
        },
        err => alert(err));
    } else {
      this._mypostsservice.disLike(posting._id).subscribe(data => {
        console.log(data);
        if (data.success) {
          this.postings[i].likes.splice(index, 1);
        }
      },
      err => alert(err));
    }
  }


}
