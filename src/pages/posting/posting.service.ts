import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TokenService } from '../services/token';

export interface User {
  fname: string;
  lname: string;
  username: string;
  email: string;
  idnum: number;
}


@Injectable()
export class PostingService {

  constructor(private _http: Http, private _tokenservice: TokenService) {}


  getPosting(postingID: string) {
    var headers = new Headers();
    headers.append("x-access-token", this._tokenservice.getToken());
    return this._http.get('http://ituwcssa.com:5500/posting/' + postingID, {
      headers: headers
    }).map(res => res.json());
  }

  postComment(postingID: string, comment: string, isAnon: Boolean) {
    var headers = new Headers();
    headers.append("x-access-token", this._tokenservice.getToken());
    return this._http.post('http://ituwcssa.com:5500/posting/' + postingID + '/reply', {
      content: comment,
      isAnon: isAnon,
    }, {
      headers: headers
    }).map(res => res.json());
  }

  like(postingID) {
    var headers = new Headers();
    headers.append("x-access-token", this._tokenservice.getToken());
    return this._http.post('http://ituwcssa.com:5500/posting/' + postingID + '/like', {}, {
      headers: headers
    }).map(res => res.json());
  }

  disLike(postingID) {
    var headers = new Headers();
    headers.append("x-access-token", this._tokenservice.getToken());
    return this._http.delete('http://ituwcssa.com:5500/posting/' + postingID + '/like', {
      headers: headers
    }).map(res => res.json());
  }



}