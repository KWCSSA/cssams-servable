import {Platform,NavController} from 'ionic-angular';
import {OnInit,ApplicationRef,Component} from '@angular/core'
import { Storage } from '@ionic/storage';
import {CardService} from './card.service';
import {File} from 'ionic-native'
declare var cordova: any;

@Component({
  templateUrl: 'card.html',
  selector: 'page-card',
})

export class CardPage implements OnInit{
	imageURL: string;
	imageName: string;
	localImageURL: string;
  constructor(public _appref: ApplicationRef,public _platform: Platform, public _cardservice:CardService,
    public storage: Storage) {
  	
  }

  ngOnInit () {
    console.log('init!');
  	// let storage = new Storage(SqlStorage,{name:"_kwcssaStorage"});

		this.storage.get("localImageURL").then(URL => {
			if(URL) {
        this.localImageURL = URL;
			}
			else {
				this._cardservice.getCardImage()
      		.subscribe(data => {
      		this.imageURL = data.imageURL;
      		this.imageName = data.imageName;
      	  this.downloadImage(this.imageURL,this.imageName);
      			},
      		err => console.log(err));
			}

		});
	}

  updateUrl() {
    console.log ("err");
    console.log (JSON.stringify(event));
    this._cardservice.getCardImage()
    .subscribe(data => {
      this.imageURL = data.imageURL;
      this.imageName = data.imageName;
      this.downloadImage(this.imageURL,this.imageName);
      },
    err => console.log(err));
  }
  		

	


  

  downloadImage(url,name) {
    if (!this._platform.is('ios') && !this._platform.is('android')) {
      this.localImageURL = url;
      return;
    }
  	var fileTransfer = new FileTransfer();
    var uri = encodeURI(url);
    // let storage = new Storage(SqlStorage,{name:"_kwcssaStorage"});
    let targetPath; // storage location depends on device type.

      // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
      if(!this._platform.is('cordova')) {
        return false;
      }
      if (this._platform.is('ios') || this._platform.is('android')) {
          targetPath = cordova.file.dataDirectory + name;
          fileTransfer.download(uri,
              targetPath,
              (entry) => {
                this.localImageURL = targetPath;
                this._appref.tick();
                this.storage.set('localImageURL', targetPath).then(res => {
                console.log(res);
              },
              err => console.log(err));
                },
              (err) => console.log(err),
              false);

        }
      else {
        // do nothing, but you could add further types here e.g. windows/blackberry
        return false;
      }
  }


}
