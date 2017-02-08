import {Platform, App, PopoverController} from 'ionic-angular';
import {ApplicationRef,Component} from '@angular/core'
import { Storage } from '@ionic/storage';
import {CardService} from './card.service';
import {PopoverPage} from '../popover/popover';
import {TokenService} from '../services/token';
import {LoginPage} from '../login/login';

declare var cordova: any;

@Component({
  templateUrl: 'card.html',
  selector: 'page-card',
})

export class CardPage {
  imageURL: string;
  imageName: string;
  localImageURL: string;
  idnum: number;
  fname: string;
  lname: string;
  email: string;
  username: string;
  isVerified: boolean;


  public timer: any = {
    running: false,
    time: 30,
  }
  public interval: any;



  constructor(public _appref: ApplicationRef,
    public _platform: Platform, 
    public _cardservice: CardService,
    public storage: Storage,
    private _app:App,
    private _tokenservice: TokenService,
    public popoverCtrl: PopoverController) {
    
  }

   presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage, {
      email: this.email,
      isVerified: this.isVerified
    });
    popover.present({
      ev: myEvent
    });
  }

  ionViewDidLoad() {

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
    this.getProfile();
  }



  getProfile() {

    this._cardservice.getProfile().subscribe(data => {
      console.log(data);
      this.idnum = data.idnum;
      this.fname = data.fname;
      this.lname = data.lname;
      this.email = data.email;
      this.isVerified = data.isEmailVerified;
    },
    err => {
      alert(JSON.stringify(err));
    }
    )
  }

   runTimer () {
    this.timer.running = true;
    this.interval = setInterval (() => {
      this.timer.time--;
      if (this.timer.time == 0) {
        clearInterval(this.interval);
        this.timer.running = false;
        this.timer.time = 30;
      }
    }, 1000);
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


  logout() {
    this._tokenservice.logout().then(res => {
      console.log(res);
      this._app.getRootNav().setRoot(LoginPage);
    },
      err => console.log(err));
  }

  downloadImage(url,name) {
    // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
    if (!this._platform.is('cordova')) {
      this.localImageURL = url;
      return;
    }
    var fileTransfer = new FileTransfer();
    var uri = encodeURI(url);
    // let storage = new Storage(SqlStorage,{name:"_kwcssaStorage"});
    let targetPath; // storage location depends on device type.

      
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
