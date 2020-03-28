import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams,ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../providers/common.service';

@Component({
    selector: 'contact-us',
    templateUrl: 'contact_us.html'
  })
  export class ContactUsPage {
    descText:any;
    imageUrl:string="http://13.233.175.188:8585/open/mobile/logo.jpg?"+ new Date();
    constructor(public nav: NavController,public loadingCtrl: LoadingController, public navParams: NavParams,
        public translate: TranslateService,public modalCtrl: ModalController,public commonService:CommonService) {
          this.translate.use(localStorage.getItem('language'));    
          this.getAllText();
      }

      getAllText(){
        this.commonService.getData().subscribe(res=>{
          console.log('res',res);
          this.descText = res.data;
        },err=>{
          console.log("err",err)
        });
      }

      doRefresh(refresher) {
        console.log('Begin async operation', refresher);
    
        setTimeout(() => {
          this.imageUrl = "http://13.233.175.188:8585/open/mobile/logo.jpg?"+ new Date();
          this.getAllText();
          refresher.complete();
        }, 2000);
      }
  }