import {Alert, NavController} from 'ionic-angular';
import {CatlistPage} from '../catlist/catlist'
import {CategoryService,category,ShopCard} from './category.service'
import {Component} from '@angular/core'

@Component({
  templateUrl: 'category.html',
  selector: 'page-category',
})

export class CategoryPage {
	bosses: category[];
  ready: boolean = false;
  constructor(private _nav: NavController, private _catservice:CategoryService) {
    _catservice.getShops().subscribe (data => {
         this.bosses = data;
         this.ready = true;
       }, err => alert(err));
  }

  toList(listName:string){

  	this._nav.push(CatlistPage,{listName:listName, list:this.bosses[listName]});

  }
}
