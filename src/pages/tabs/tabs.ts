import {Component} from '@angular/core';
import {CardPage} from '../card/card';
import {CategoryPage} from '../category/category';
import {ProfilePage} from '../profile/profile';
import {WallPage} from '../wall/wall';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  public tab1Root: any;
  public tab2Root: any;
  public tab3Root: any;
  public tab4Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = CardPage;
    this.tab2Root = CategoryPage;
    this.tab3Root = WallPage;
    this.tab4Root = ProfilePage;
  }
}


