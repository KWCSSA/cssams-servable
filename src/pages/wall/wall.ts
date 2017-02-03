import { NavController, ToastController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { WallService } from './wall.service';
import { WallPostPage } from '../wallpost/wallpost';
import { TokenService } from '../services/token';
import { PostingPage } from '../posting/posting';
import { MypostsPage } from '../myposts/myposts';
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-wall',
  templateUrl: 'wall.html',
})

export class WallPage implements OnInit {
  public postings: any;
  public offset: number = 0;
  public limit: number = 10;
  public _id: string;
  public segment:string;
  public loading: boolean = true;
  public atBottom: boolean = false;
  // public postings: any;

  constructor(private _nav: NavController,
    private _tokenservice: TokenService,
    private _wallservice: WallService,
    public events: Events,
    private toastCtrl: ToastController
  ) {
    this.segment = "latest";
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.offset = 0;
    this._wallservice.getFeed(this.offset, this.limit, this.segment).subscribe(data => {
      this.postings = data;
      refresher.complete();
      this.atBottom = false;
    });
  }

  doInfinite(infiniteScroll) {
    if (!this.atBottom) {
      console.log('scrooooolll INFINITEEE');
      this.offset += 10;
      this._wallservice.getFeed(this.offset, this.limit, this.segment).subscribe(data => {
        if (data.length == 0) {
         let toast = this.toastCtrl.create({
            message: '没啦:(',
            duration: 1000,
            position: 'bottom'
          });
         toast.present();
         this.atBottom = true;
        }

        this.postings = this.postings.concat(data);
        infiniteScroll.complete();
      });
    }
    else infiniteScroll.complete();
    }
    

  changeFeed(event) {
    console.log (event);
    this.postings = null;
    this.loading = true;
    this.offset = 0;
    this._wallservice.getFeed(this.offset, this.limit, this.segment).subscribe(data => {
      this.postings = data;
      this.loading = false;
      this.atBottom = false;
    });
  }




  ngOnInit() {
    this._id = this._tokenservice.getId();
    this._wallservice.getFeed(this.offset, this.limit, this.segment).subscribe(data => {
      this.postings = data;
      this.loading = false;
      this.atBottom = false;
    });
    this.events.subscribe('post:created', () => {
      this.loading = true;
      this._wallservice.getFeed(this.offset, this.limit, this.segment).subscribe(data => {
        this.postings = data;
        this.loading = false;
        this.atBottom = false;
      });
    });

  }

  seeComments(posting, i) {
    this._nav.push(PostingPage, {
      postingId: posting._id
    });
  }

  toggleLike(posting, i) {
    var index = posting.likes.indexOf(this._id);
    if (index == -1) {
      this._wallservice.like(posting._id).subscribe(data => {
          if (data.success) {
            this.postings[i].likes.push(this._id);
          }
        },
        err => alert(err));
    } else {
      this._wallservice.disLike(posting._id).subscribe(data => {
          console.log(data);
          if (data.success) {
            this.postings[i].likes.splice(index, 1);
          }
        },
        err => alert(err));
    }
  }

  seeMyposts() {
    this._nav.push(MypostsPage, {});
  }



  post() {
    this._nav.push(WallPostPage, {});
  }

}