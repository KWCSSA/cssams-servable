import {NavController, NavParams,Platform} from 'ionic-angular';
import {OnInit,ApplicationRef,Component} from '@angular/core'
import {CatlistService,ShopCard} from './catlist.service'
import {Storage} from '@ionic/storage';
declare var cordova: any;

@Component({
  templateUrl: 'catlist.html',
  selector:'page-catlist',
  providers: [CatlistService]
})
export class CatlistPage {
	listName: string;
	list:ShopCard[]


	constructor(private _nav: NavController, 
				private _appref:ApplicationRef,
                private _navParams: NavParams,
                private _catlistservice:CatlistService,
                private _platform:Platform,
                public storage: Storage) {
	  	 this.listName = _navParams.get('listName');
	  	 this.list = _navParams.get('list');
	  	 this.list.forEach((item) => {
	  	 	this.storage.get(item.id).then(URL => {
			if(URL) {
				item.localImageURL = URL;
			}
			else {	
        	  	this.downloadImage(item.imageUrl,item.id, item);
        	}
		

		});
	  	 });
	  }

	updateUrl(shop) {
		console.log ("err");
		this.downloadImage(shop.imageUrl, shop.id, shop);
	}

	downloadImage(url, name, item) {
		if (!this._platform.is('ios') && !this._platform.is('android')) {
			item.localImageURL = url;
			return;
		}
		console.log ('downloading!');
	  	var fileTransfer = new FileTransfer();
	    var uri = encodeURI(url);
	    let targetPath; // storage location depends on device type.

	      // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
	      if(!this._platform.is('cordova')) {
	        return false;
	      }
	      if (this._platform.is('ios')||this._platform.is('android')) {
	        targetPath = cordova.file.dataDirectory + name +'.png';
	        fileTransfer.download(uri,
	            targetPath,
	            (entry) => {
	              item.localImageURL = targetPath;
	              this._appref.tick();
	              this.storage.set(name, targetPath).then(res => {
	          		console.log(res);
	        	  },
	        		err => console.log(err));
	              },
	            (err) => console.log(err),
	            false);

	      }
	      else {
	        return false;
	      }
  }

	  navigate(shopCard:ShopCard) {
	  	if(this._platform.is('ios')){
	      window.open('maps://?q=' +shopCard.address , '_system');
		} else {
			window.open('geo:0,0?q=' +shopCard.address , '_system');
		}
	
	  }

}
