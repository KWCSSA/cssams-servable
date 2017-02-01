import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule} from '@angular/http';
import { FormsModule }    from '@angular/forms';
import { CategoryPage } from '../pages/category/category';
import { CategoryService } from '../pages/category/category.service';
import { CatlistPage } from '../pages/catlist/catlist';
import { CatlistService } from '../pages/catlist/catlist.service';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ForgetService} from '../pages/forget/forget.service';
import { CardPage } from '../pages/card/card';
import { CardService } from '../pages/card/card.service';
import { ForgetPage } from '../pages/forget/forget';
import { ProfilePage } from '../pages/profile/profile';
import { ProfileService } from '../pages/profile/profile.service';
import { TokenService } from '../pages/services/token';
import { TabsPage } from '../pages/tabs/tabs';
import { WallPage } from '../pages/wall/wall';
import { WallService } from '../pages/wall/wall.service';
import { PostingPage } from '../pages/posting/posting';
import { PostingService } from '../pages/posting/posting.service';
import { WallPostPage } from '../pages/wallpost/wallpost';
import { PopoverPage } from '../pages/popover/popover';
import { PopoverService } from '../pages/popover/popover.service';
import { WallPostService } from '../pages/wallpost/wallpost.service';
import { Storage } from '@ionic/storage';
import {MomentModule} from 'angular2-moment';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'c48f51a4',
  },
  'push': {
    'sender_id': '206726418266',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};


@NgModule({
  declarations: [
    MyApp,
    CategoryPage,
    CatlistPage,
    LoginPage,
    TabsPage,
    RegisterPage,
    ForgetPage,
    ProfilePage,
    CardPage,
    WallPage,
    WallPostPage,
    PostingPage,
    PopoverPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages:true
    }),
    CloudModule.forRoot(cloudSettings),
    HttpModule,
    FormsModule,
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CategoryPage,
    CatlistPage,
    LoginPage,
    TabsPage,
    RegisterPage,
    ProfilePage,
    CardPage,
    ForgetPage,
    WallPage,
    WallPostPage,
    PostingPage,
    PopoverPage
  ],
  providers: [
    ProfileService,
    CardService,
    TokenService,
    CategoryService,
    ForgetService,
    CatlistService,
    WallService,
    WallPostService,
    PostingService,
    PopoverService,
    Storage
  ]
})
export class AppModule {}
